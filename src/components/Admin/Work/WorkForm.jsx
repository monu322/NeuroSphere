import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import db, { storage } from "../../../config/fire-config";

import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";

const WorkForm = () => {
  const [notification, setNotification] = useState("");
  const [errMessage, setErrMessage] = useState(null);

  // Initialize state for all services as an array of objects
  const [services, setServices] = useState([]);

  // Object to hold the input values for the new service
  const [newService, setNewService] = useState({
    serviceTitle: "",
    serviceDecription: "",
    serviceIconClass: "",
  });

  // Function to handle changes in the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({
      ...newService,
      [name]: value,
    });
  };

  // Function to handle the click event and add a new service to the state
  const handleAdd = () => {
    // Update the state with the new service
    setServices([...services, newService]);

    // Reset the input values to empty after adding
    setNewService({
      serviceTitle: "",
      serviceDecription: "",
      serviceIconClass: "",
    });
    console.log(JSON.stringify(services));
  };

  const router = useRouter();

  const initialValues = {
    img: "",
    // type: "",
    link: "",
    wideImg: "",
    title: "",
    description: "",
    tags: "",
    objective: "",
    servicesIntro: "",
    services: [],
    outcomeText: "",
    outcomes: [],
  };

  const validateForm = (formValues) => {
    if (
      // !formValues.type ||
      !formValues.title ||
      !formValues.description ||
      !formValues.objective ||
      !formValues.servicesIntro ||
      !formValues.services ||
      !formValues.outcomeText ||
      !formValues.outcomes
    ) {
      setErrMessage("Please fill in all fields");
      return false;
    }
    // if (formValues.type.length < 5) {
    //   setErrMessage("Name must be at least 5 characters");
    //   return false;
    // }
    if (formValues.title.length < 5) {
      setErrMessage("Name must be at least 5 characters");
      return false;
    }
    if (formValues.description.length < 10) {
      setErrMessage("Message must be at least 10 characters");
      return false;
    }
    if (formValues.tags.length < 2) {
      setErrMessage("Name must be at least 5 characters");
      return false;
    }
    if (formValues.objective.length < 10) {
      setErrMessage("Message must be at least 10 characters");
      return false;
    }
    if (formValues.servicesIntro.length < 10) {
      setErrMessage("Message must be at least 10 characters");
      return false;
    }
    if (formValues.services.length < 10) {
      setErrMessage("Message must be at least 10 characters");
      return false;
    }
    if (formValues.outcomeText.length < 10) {
      setErrMessage("Message must be at least 10 characters");
      return false;
    }
    if (formValues.outcomes.length < 10) {
      setErrMessage("Message must be at least 10 characters");
      return false;
    }
    if (!formValues.img) {
      setErrMessage("Please select an image file");
      return false;
    }
    if (!formValues.img.type.startsWith("image/")) {
      setErrMessage("Please select an image");
      return false;
    }
    return true;
  };

  const clearNotification = () => {
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };
  const addWork = async (values) => {
    const ImgStorageRef = ref(
      storage,
      `workImages/img${values.img.name + values.img.size}`
    );
    const wideImgStorageRef = ref(
      storage,
      `workImages/wideImg${values.wideImg.name + values.wideImg.size}`
    );
    await uploadBytes(ImgStorageRef, values.img);
    await uploadBytes(wideImgStorageRef, values.wideImg);
    const imageURL = await getDownloadURL(ImgStorageRef);
    const wideImageURL = await getDownloadURL(wideImgStorageRef);
    const response = await fetch("/api/work", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values, imageURL, wideImageURL }),
    });
    const { message, error } = await response.json();
    !error ? setNotification(message) : setNotification(error);
    clearNotification("");
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (validateForm(values)) {
        setErrMessage(null);
        setSubmitting(false);
        await addWork(values);
        resetForm();
        setTimeout(() => {
          router.push("/admin/works");
          setNotification("");
        }, 2000);
      }
    } catch (error) {
      setNotification(error);
      clearNotification();
    }
  };

  return (
    <>
      <div className="mt-2 container">
        {notification && <div className="notification">{notification}</div>}
        <Formik const initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, setFieldValue }) => (
            <Form>
              <div className="d-flex justify-content-center flex-column">
                <div className="text-dark mb-3 blg-head mt-4 mb-4">
                  Add New Work
                </div>
              </div>

              <div className="mb-4">
                <div className="col-lg-6 col-md-6 mb-4">
                  <div className="blog-box p-4">
                    {errMessage && <div className="messages">{errMessage}</div>}
                    <div className="controls blog-form">
                      {/* <div className="form-group d-flex flex-column">
                        <label htmlFor="Type">Type</label>
                        <Field
                          id="form_type"
                          type="text"
                          name="type"
                          placeholder="Work Type"
                          required="required"
                          value={values.type}
                        />
                      </div> */}
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="Title">Title</label>
                        <Field
                          id="form_Title"
                          type="text"
                          name="title"
                          placeholder="Work Title"
                          required="required"
                          value={values.title}
                        />
                      </div>

                      <div className="form-group d-flex flex-column">
                        <label htmlFor="Tags">Tags</label>
                        <Field
                          type="text"
                          id="tags"
                          placeholder="Tags"
                          name="tags"
                        />
                      </div>

                      <div className="form-group d-flex flex-column">
                        <label htmlFor="Link">Link</label>
                        <Field
                          id="form_link"
                          type="text"
                          name="link"
                          placeholder="Link"
                          required="required"
                          value={values.link}
                        />
                      </div>

                      <div className="form-group d-flex flex-column">
                        <label htmlFor="objective">Objective</label>
                        <Field
                          as="textarea"
                          id="form_objective"
                          name="objective"
                          placeholder="Objective"
                          rows="4"
                          required="required"
                          value={values.objective}
                        />
                      </div>
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="description">Description</label>
                        <Field
                          as="textarea"
                          id="form_description"
                          name="description"
                          placeholder="Description"
                          rows="4"
                          required="required"
                          value={values.description}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="row mb-4">
                    <div className="col-lg-12">
                      <div className="blog-box p-4">
                        <div className="controls blog-form">
                          <div className="form-group d-flex flex-column">
                            <label htmlFor="Tag">Add Image</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(event) => {
                                setFieldValue("img", event.target.files[0]);
                              }}
                            />
                          </div>
                          <div className="form-group d-flex flex-column">
                            <label htmlFor="Tag">Add Wide Image</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(event) => {
                                setFieldValue("wideImg", event.target.files[0]);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-lg-12">
                      <div className="blog-box p-4">
                        <div className="controls blog-form">
                          <div className="form-group d-flex flex-column">
                            <label htmlFor="heading">
                              Testimonials Content
                            </label>
                            <input
                              id="heading"
                              type="text"
                              // value={heading}
                              // onChange={handleHeadingChange}
                              placeholder="Post Heading"
                              className="border border-secondary"
                            />
                          </div>
                          <div className="form-group d-flex flex-column">
                            <label htmlFor="heading">Testimonials Name</label>
                            <input
                              id="heading"
                              type="text"
                              // value={heading}
                              // onChange={handleHeadingChange}
                              placeholder="Post Heading"
                              className="border border-secondary"
                            />
                          </div>
                          <div className="form-group d-flex flex-column">
                            <label htmlFor="servicesIntro">
                              Testimonials Details
                            </label>
                            <input
                              id="heading"
                              type="text"
                              // value={heading}
                              // onChange={handleHeadingChange}
                              placeholder="Post Heading"
                              className="border border-secondary"
                            />
                          </div>
                          <div className="form-group d-flex flex-column">
                            <label htmlFor="heading">Testimonials Image</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(event) => {
                                setFieldValue("wideImg", event.target.files[0]);
                              }}
                            />
                          </div>
                          <button
                            // onClick={addPostContent}
                            type="button"
                            className="btn_post-content"
                            // disabled={isButtonDisabled}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="col-lg-6 col-md-6 mb-4">
                  <div className="controls blog-form">
                    <div className="blog-box p-4">
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="servicesIntro">Service Intro</label>
                        <Field
                          as="textarea"
                          id="form_servicesIntro"
                          name="servicesIntro"
                          placeholder="ServicesIntro"
                          rows="4"
                          required="required"
                          value={values.servicesIntro}
                        />
                      </div>
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="heading">Service Title</label>
                        <input
                          id="heading"
                          type="text"
                          name="serviceTitle"
                          value={newService.serviceTitle}
                          // onChange={handleHeadingChange}
                          onChange={handleInputChange}
                          placeholder="Post Heading"
                          className="border border-secondary"
                        />
                      </div>
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="heading">Service Description</label>
                        <input
                          id="heading"
                          type="text"
                          name="serviceDecription"
                          value={newService.serviceDecription}
                          // onChange={handleHeadingChange}
                          onChange={handleInputChange}
                          placeholder="Post Heading"
                          className="border border-secondary"
                        />
                      </div>
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="heading">Service Icon Class</label>
                        <input
                          id="heading"
                          type="text"
                          name="serviceIconClass"
                          value={newService.serviceIconClass}
                          // onChange={handleHeadingChange}
                          onChange={handleInputChange}
                          placeholder="Post Heading"
                          className="border border-secondary"
                        />
                      </div>
                      <button
                        // onClick={addPostContent}
                        onClick={handleAdd}
                        type="button"
                        className="btn_post-content"
                        // disabled={isButtonDisabled}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 mb-4">
                  <div className="controls blog-form">
                    <div className="blog-box p-4">
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="servicesIntro">Outcome Text</label>
                        <Field
                          as="textarea"
                          id="form_servicesIntro"
                          name="outcomeText"
                          placeholder="Outcome Text"
                          rows="4"
                          required="required"
                          value={values.outcomeText}
                        />
                      </div>
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="heading">Outcome Title</label>
                        <input
                          id="heading"
                          type="text"
                          // value={heading}
                          // onChange={handleHeadingChange}
                          placeholder="Post Heading"
                          className="border border-secondary"
                        />
                      </div>
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="heading">Outcome Description</label>
                        <input
                          id="heading"
                          type="text"
                          // value={heading}
                          // onChange={handleHeadingChange}
                          placeholder="Post Heading"
                          className="border border-secondary"
                        />
                      </div>
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="heading">Outcome Icon Class</label>
                        <input
                          id="heading"
                          type="text"
                          // value={heading}
                          // onChange={handleHeadingChange}
                          placeholder="Post Heading"
                          className="border border-secondary"
                        />
                      </div>
                      <button
                        // onClick={addPostContent}
                        type="button"
                        className="btn_post-content"
                        // disabled={isButtonDisabled}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="col-lg-6 col-md-6">
                  <div className="controls blog-form">
                    <div className="blog-box p-4">
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="heading">Skill Title</label>
                        <input
                          id="heading"
                          type="text"
                          // value={heading}
                          // onChange={handleHeadingChange}
                          placeholder="Post Heading"
                          className="border border-secondary"
                        />
                      </div>
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="heading">Skill Subtitle</label>
                        <input
                          id="heading"
                          type="text"
                          // value={heading}
                          // onChange={handleHeadingChange}
                          placeholder="Post Heading"
                          className="border border-secondary"
                        />
                      </div>
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="heading">Skill Value</label>
                        <input
                          id="heading"
                          type="text"
                          // value={heading}
                          // onChange={handleHeadingChange}
                          placeholder="Post Heading"
                          className="border border-secondary"
                        />
                      </div>
                      <button
                        // onClick={addPostContent}
                        type="button"
                        className="btn_post-content"
                        // disabled={isButtonDisabled}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                <div className="d-flex ml-3 mt-4">
                  <div>
                    <button type="submit" className="btn-blog mr-4">
                      <span>Save</span>
                    </button>
                  </div>
                  <div>
                    <button type="submit" className="btn-blog">
                      <span>Publish</span>
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
export default WorkForm;
