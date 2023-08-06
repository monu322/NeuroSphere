import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import db, { storage } from "../../../config/fire-config";
import { serverTimestamp, updateDoc, doc, getDoc } from "firebase/firestore";
import { Router, useRouter } from "next/router";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../../Loading-Screen/loading-screen";

function UpdateWork({ id }) {
  const [workId] = useState(id);
  const [errMessage, setErrMessage] = useState(null);
  const [notification, setNotification] = useState("");
  const [workData, setWorkData] = useState("");
  const [isPublished, setIsPublished] = useState(null);
  const [services, setServices] = useState({});
  const [outcomes, setOutcomes] = useState([]);

  const router = useRouter();

  const initialValues = {
    // img: workData.img || "",
    link: workData?.url || "",
    // wideImg: workData.wideImg || "",
    title: workData?.title || "",
    description: workData?.description || "",
    tags: workData?.tags || "",
    objective: workData?.objective || "",
    servicesIntro: workData?.servicesIntro || "",
    // serviceImg: workData.serviceImg || "",
    services: workData?.services || [],
    outcomeText: workData?.outcomeText || "",
    // outcomeImg: workData.outcomeImg || "",
    outcomes: workData?.outcomes || [],
    testimonialName: workData?.testimonialName || "",
    testimonialContent: workData?.testimonialContent || "",
    testimonialDetails: workData?.testimonialDetails || "",
    // testimonialImg: workData.testimonialImg,
    published: true,
  };

  const clearNotification = () => {
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const getWorkData = async () => {
    console.log("In get");
    const response = await fetch("/api/work", {
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { data, error } = await response.json();
    data ? setWorkData(data) : setNotification(error);
    console.log("data in getWorkData  " + data);
    clearNotification();
  };

  const updateWork = async (values) => {
    // const storageRef = ref(
    //   storage,
    //   `blogImages/${values.img.name + values.img.size}`
    // );

    // await uploadBytes(storageRef, values.img);
    // const image = await getDownloadURL(storageRef);
    const response = await fetch("/api/work", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values,
        workId,
      }),
    });
    const { message, error } = await response.json();
    !error ? setNotification(message) : setNotification(error);
    clearNotification();
    router.push("/admin");
  };

  const getWorkDataWithId = async (id) => {
    const docRef = doc(db, "works", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(JSON.stringify(docSnap.data()));
      setWorkData(docSnap.data());
    } else {
      console.log("No such document");
    }
  };

  const handleUpdate = async (values) => {
    values.published = false;
  };

  useEffect(async () => {
    if (id) {
      await getWorkDataWithId(id);
    }
  }, [id]);

  if (!workData) {
    return <LoadingScreen />;
  }
  return (
    <>
      <div className="mt-2 container">
        {notification && <div className="notification">{notification}</div>}
        {errMessage && <div className="messages">{errMessage}</div>}

        <Formik initialValues={initialValues} enableReinitialize={true}>
          {({ values, setFieldValue }) => (
            <Form>
              <div className="">
                <div className="d-flex justify-content-between">
                  <div className="text-dark mb-3 blg-head mt-4 mb-4">
                    Add New Work
                  </div>
                  <div className="mb-4">
                    <div className="d-flex ml-3 mt-4">
                      <div>
                        <button
                          type="button"
                          onClick={() => handleUpdate(values)}
                          className="btn-blog mr-4"
                        >
                          <span>Update</span>
                        </button>
                      </div>
                      <div>
                        <button type="submit" className="btn-blog">
                          <span>Publish</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" container mb-4">
                <div className="row">
                  <div className="col-lg-6 col-md-12 mb-4">
                    <div className="blog-box p-4">
                      <div className="controls blog-form">
                        <div className="form-group d-flex flex-column">
                          <label htmlFor="Title">Title</label>
                          <Field
                            id="form_Title"
                            type="text"
                            name="title"
                            placeholder="Work Title"
                            required="required"
                            // value={values.title}
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
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="mb-4"> */}
                  <div className="col-lg-6 col-md-12">
                    <div className="blog-box p-4">
                      <div className="controls blog-form">
                        <div className="form-group d-flex flex-column">
                          <div className="form-group d-flex flex-column">
                            <label htmlFor="heading">Testimonials Name</label>
                            <Field
                              id="heading"
                              type="text"
                              // onChange={handleHeadingChange}
                              name="testimonialName"
                              placeholder="Post Heading"
                              className="border border-secondary"
                            />
                          </div>

                          <div className="form-group d-flex flex-column pt-4">
                            <label htmlFor="heading">
                              Testimonials Content
                            </label>
                            <Field
                              id="heading"
                              name="testimonialContent"
                              // type="text"
                              as="textarea"
                              rows="4"
                              // onChange={handleHeadingChange}
                              placeholder="Post Heading"
                              className="border border-secondary"
                            />
                          </div>
                        </div>
                        <div className="form-group d-flex flex-column">
                          <label htmlFor="servicesIntro">
                            Testimonials Details
                          </label>
                          <Field
                            id="heading"
                            name="testimonialDetails"
                            // type="text"
                            as="textarea"
                            rows="4"
                            // onChange={handleHeadingChange}
                            placeholder="Post Heading"
                            className="border border-secondary"
                          />
                        </div>
                        <div className="form-group d-flex flex-column pt-4">
                          <label htmlFor="heading">Testimonials Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                              setFieldValue(
                                "testimonialImg",
                                event.target.files[0]
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </div> */}

                  <div className="col-lg-12 col-md-12">
                    {/* <div className="row mb-4">
                      <div className="col-lg-12"> */}
                    <div className="blog-box p-4">
                      <div className="controls blog-form">
                        <div className="form-group d-flex flex-column">
                          <label htmlFor="Tag">Add Image</label>
                          <Field
                            type="file"
                            accept="image/*"
                            name="img"
                            onChange={(event) => {
                              setFieldValue("img", event.target.files[0]);
                            }}
                          />
                        </div>
                        <div className="form-group d-flex flex-column">
                          <label htmlFor="Tag">Add Wide Image</label>
                          <Field
                            type="file"
                            accept="image/*"
                            name="wideImg"
                            onChange={(event) => {
                              setFieldValue("wideImg", event.target.files[0]);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* </div>
                    </div> */}
                  </div>
                  {/* <div className="mb-4"> */}
                  <div className="col-lg-6 col-md-12 mb-4 mt-4">
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
                          />
                          <label htmlFor="Tag">Add Service Img</label>
                          <Field
                            type="file"
                            accept="image/*"
                            name="serviceImg"
                            onChange={(event) => {
                              setFieldValue(
                                "serviceImg",
                                event.target.files[0]
                              );
                            }}
                          />
                        </div>
                        {workData?.services &&
                          Object.keys(workData?.services).map(
                            (service, index) => (
                              <div
                                className="mb-5 mt-4 border-bottom border-dark"
                                key={index}
                              >
                                <div className="form-group d-flex flex-column">
                                  <label htmlFor="heading">
                                    Service Title {index + 1}
                                  </label>
                                  <Field
                                    id="heading"
                                    type="text"
                                    name={`services[${service}].serviceTitle`}
                                    // onChange={handleHeadingChange}
                                    // onChange={handleServiceChange}
                                    placeholder="Post Heading"
                                    className="border border-secondary"
                                  />
                                </div>
                                <div className="form-group d-flex flex-column">
                                  <label htmlFor="heading">
                                    Service Icon Class
                                  </label>
                                  <Field
                                    id="heading"
                                    type="text"
                                    name={`services[${service}].serviceIconClass`}
                                    // onChange={handleHeadingChange}
                                    // onChange={handleServiceChange}
                                    placeholder="Post Heading"
                                    className="border border-secondary"
                                  />
                                </div>
                                <div className="form-group d-flex flex-column">
                                  <label htmlFor="heading">
                                    Service Description
                                  </label>
                                  <Field
                                    id="heading"
                                    // type="text"
                                    as="textarea"
                                    rows="4"
                                    name={`services[${service}].serviceDecription`}
                                    // onChange={handleHeadingChange}
                                    // onChange={handleServiceChange}
                                    placeholder="Post Heading"
                                    className="border border-secondary"
                                  />
                                </div>
                              </div>
                            )
                          )}
                        <button
                          //   onClick={handleAddService}
                          type="button"
                          className="btn_post-content"
                          // disabled={isButtonDisabled}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12 mb-4 mt-4">
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
                          />
                          <label htmlFor="Tag">Add Outcome Img</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                              setFieldValue(
                                "outcomeImg",
                                event.target.files[0]
                              );
                            }}
                          />
                        </div>
                        {workData?.outcomes &&
                          Object.keys(workData?.outcomes).map(
                            (outcome, index) => (
                              <div
                                className="mb-5 mt-4 border-bottom border-dark"
                                key={index}
                              >
                                <div className="form-group d-flex flex-column">
                                  <label htmlFor="heading">
                                    Outcome Title {index + 1}
                                  </label>
                                  <Field
                                    id="heading"
                                    type="text"
                                    name={`outcomes[${outcome}].outcomeTitle`}
                                    // onChange={handleHeadingChange}
                                    // onChange={handleOutcomeChange}
                                    placeholder="Post Heading"
                                    className="border border-secondary"
                                  />
                                </div>

                                <div className="form-group d-flex flex-column">
                                  <label htmlFor="heading">
                                    Outcome Icon Class
                                  </label>
                                  <Field
                                    id="heading"
                                    type="text"
                                    name={`outcomes[${outcome}].outcomeIconClass`}
                                    // onChange={handleHeadingChange}
                                    // onChange={handleOutcomeChange}
                                    placeholder="Post Heading"
                                    className="border border-secondary"
                                  />
                                </div>
                                <div className="form-group d-flex flex-column">
                                  <label htmlFor="heading">
                                    Outcome Description
                                  </label>
                                  <Field
                                    id="heading"
                                    // type="text"
                                    as="textarea"
                                    rows="4"
                                    name={`outcomes[${outcome}].outcomeDescription`}
                                    // onChange={handleHeadingChange}
                                    // onChange={handleOutcomeChange}
                                    placeholder="Post Heading"
                                    className="border border-secondary"
                                  />
                                </div>
                              </div>
                            )
                          )}
                        <button
                          // onClick={addPostContent}
                          //   onClick={handleAddOutcome}
                          type="button"
                          className="btn_post-content"
                          // disabled={isButtonDisabled}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default UpdateWork;
