import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import db, { storage } from "../../../config/fire-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../../Loading-Screen/loading-screen";
import PreviewImage from "../../PreviewImage";

function UpdateWork({ id }) {
  const [workId] = useState(id);
  const [errMessage, setErrMessage] = useState(null);
  const [notification, setNotification] = useState("");
  const [workData, setWorkData] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPreviewImage, setShowPreviewImage] = useState(false);

  const router = useRouter();

  const initialValues = {
    img: workData.img || "",
    link: workData.link || "",
    wideImg: workData.wideImg || "",
    title: workData.title || "",
    description: workData.description || "",
    tags: workData.tags || "",
    objective: workData.objective || "",
    servicesIntro: workData.servicesIntro || "",
    serviceImg: workData.serviceImg || "",
    services: workData.services || [],
    outcomeText: workData.outcomeText || "",
    outcomeImg: workData.outcomeImg || "",
    outcomes: workData.outcomes || [],
    testimonialName: workData.testimonialName || "",
    testimonialContent: workData.testimonialContent || "",
    testimonialDetails: workData.testimonialDetails || "",
    testimonialImg: workData.testimonialImg || "",
    published: true,
  };

  const clearNotification = () => {
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const clearErrorMessage = () => {
    setTimeout(() => {
      setErrMessage("");
    }, 2000);
  };

  const updateWork = async (values) => {
    let imageURL = workData.img;
    let wideImageURL = workData.wideImg;
    let testimonialImgUrl = workData.testimonialImg;
    let serviceImgUrl = workData.serviceImg;
    let outcomeImgUrl = workData.outcomeImg;

    if (values.img instanceof File) {
      console.log("values.img present after update :" + values.img);
      const ImgStorageRef = ref(
        storage,
        `workImages/img${values.img.name + values.img.size}`
      );
      await uploadBytes(ImgStorageRef, values.img);
      imageURL = await getDownloadURL(ImgStorageRef);
    }

    if (values.wideImg instanceof File) {
      console.log("inside wideImg : " + values.wideImg);
      const wideImgStorageRef = ref(
        storage,
        `workImages/wideImg${values.wideImg.name + values.wideImg.size}`
      );
      await uploadBytes(wideImgStorageRef, values.wideImg);
      wideImageURL = await getDownloadURL(wideImgStorageRef);
    }
    if (values.testimonialImg instanceof File) {
      console.log("in testi");
      console.log(values.testimonialImg);
      const testimonialImgStorageRef = ref(
        storage,
        `workImages/testimonialImg${
          values.testimonialImg.name + values.testimonialImg.size
        }`
      );
      await uploadBytes(testimonialImgStorageRef, values.testimonialImg);
      testimonialImgUrl = await getDownloadURL(testimonialImgStorageRef);
    }
    if (values.serviceImg instanceof File) {
      console.log("in ser :" + values.serviceImg);
      const serviceImgStorageRef = ref(
        storage,
        `workImages/serviceImg${
          values.serviceImg.name + values.serviceImg.size
        }`
      );
      await uploadBytes(serviceImgStorageRef, values.serviceImg);
      serviceImgUrl = await getDownloadURL(serviceImgStorageRef);
    }
    if (values.outcomeImg instanceof File) {
      console.log("in out : " + values.outcomeImg);
      const outcomeImgStorageRef = ref(
        storage,
        `workImages/outcomeImg${
          values.outcomeImg.name + values.outcomeImg.size
        }`
      );
      await uploadBytes(outcomeImgStorageRef, values.outcomeImg);
      outcomeImgUrl = await getDownloadURL(outcomeImgStorageRef);
    }
    const response = await fetch("/api/work", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values,
        workId,
        imageURL,
        testimonialImgUrl,
        wideImageURL,
        serviceImgUrl,
        outcomeImgUrl,
      }),
    });
    const { message, error } = await response.json();
    !error ? setNotification(message) : setNotification(error);
    clearNotification();
    console.log("Work updated");
    router.push("/admin/works");
  };

  const getWorkDataWithId = async (id) => {
    const docRef = doc(db, "works", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setWorkData(docSnap.data());
      console.log("Fetched work data");
    } else {
      setErrMessage("No such document");
      clearErrorMessage();
      console.log("No such document");
    }
  };

  const handleImageChange = (fieldName, event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedImage((prevImages) => ({
        ...prevImages,
        [fieldName]: URL.createObjectURL(file),
      }));
    }
  };

  const handleImageRemove = async (imageFieldName) => {
    const docRef = doc(db, "works", id);
    const docSnap = await getDoc(docRef);
    const imageData = docSnap.data()[imageFieldName];

    if (imageData) {
      const updateData = {};
      updateData[imageFieldName] = "";
      await updateDoc(docRef, updateData);

      const imageStorageRef = ref(storage, imageData);
      await deleteObject(imageStorageRef);

      const updatedDocSnapshot = await getDoc(docRef);
      if (updatedDocSnapshot.exists()) {
        setWorkData(updatedDocSnapshot.data());
      }
    }
  };

  const handleUpdate = async (values) => {
    values.published = false;
    await updateWork(values);
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
                  <div className="col-lg-12 col-md-12 mb-4">
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
                  <div className="col-lg-12 col-md-12">
                    <div className="blog-box p-4">
                      <div className="controls blog-form">
                        <div className="form-group d-flex flex-column">
                          <div className="form-group d-flex flex-column">
                            <label htmlFor="heading">Testimonials Name</label>
                            <Field
                              id="heading"
                              type="text"
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
                              as="textarea"
                              rows="4"
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
                            as="textarea"
                            rows="4"
                            placeholder="Post Heading"
                            className="border border-secondary"
                          />
                        </div>
                        <div className="form-group d-flex flex-column pt-4">
                          <label htmlFor="heading">Testimonials Image</label>
                          {values?.testimonialImg ? (
                            <>
                              <div className="d-flex">
                                <button
                                  className="btn-blog mt-4 mb-4 w-25"
                                  onClick={() =>
                                    setShowPreviewImage(!showPreviewImage)
                                  }
                                >
                                  {showPreviewImage ? "close" : "preview Image"}
                                </button>
                                {showPreviewImage && (
                                  <button
                                    type="button"
                                    className="btn-blog mt-4 mb-4 w-25 ml-3"
                                    onClick={() => {
                                      setFieldValue("testimonialImg", "");
                                      handleImageRemove("testimonialImg");
                                    }}
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                              {showPreviewImage && (
                                <img
                                  src={
                                    selectedImage?.testimonialImg ||
                                    values?.testimonialImg
                                  }
                                  alt="imgg"
                                  className="w-50"
                                />
                              )}
                            </>
                          ) : (
                            <Field
                              type="file"
                              accept="image/*"
                              name="testimonialImg"
                              onChange={(event) => {
                                setFieldValue(
                                  "testimonialImg",
                                  event.target.files[0]
                                );
                                handleImageChange("testimonialImg", event);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="blog-box p-4">
                      <div className="controls blog-form">
                        <div className="form-group d-flex flex-column">
                          <label htmlFor="Tag">Add Image</label>
                          {values?.img ? (
                            <>
                              <div className="d-flex">
                                <button
                                  className="btn-blog mt-4 mb-4 w-25"
                                  onClick={() =>
                                    setShowPreviewImage(!showPreviewImage)
                                  }
                                >
                                  {showPreviewImage ? "close" : "preview Image"}
                                </button>
                                {showPreviewImage && (
                                  <button
                                    type="button"
                                    className="btn-blog mt-4 mb-4 w-25 ml-3"
                                    onClick={() => {
                                      setFieldValue("img", "");
                                      handleImageRemove("img");
                                    }}
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                              {showPreviewImage && (
                                <img
                                  src={selectedImage?.img || values?.img}
                                  alt="imgg"
                                  className="w-50"
                                />
                              )}
                            </>
                          ) : (
                            <Field
                              type="file"
                              accept="image/*"
                              name="img"
                              onChange={(event) => {
                                setFieldValue("img", event.target.files[0]);
                                handleImageChange("img", event);
                              }}
                            />
                          )}
                        </div>
                        <div className="form-group d-flex flex-column">
                          <label htmlFor="Tag">Add Wide Image</label>
                          {values?.wideImg ? (
                            <>
                              <div className="d-flex">
                                <button
                                  className="btn-blog mt-4 mb-4 w-25"
                                  onClick={() =>
                                    setShowPreviewImage(!showPreviewImage)
                                  }
                                >
                                  {showPreviewImage ? "close" : "preview Image"}
                                </button>
                                {showPreviewImage && (
                                  <button
                                    type="button"
                                    className="btn-blog mt-4 mb-4 w-25 ml-3"
                                    onClick={() => {
                                      setFieldValue("wideImg", "");
                                      handleImageRemove("wideImg");
                                    }}
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                              {showPreviewImage && (
                                <img
                                  src={
                                    selectedImage?.wideImg || values?.wideImg
                                  }
                                  alt="imgg"
                                  className="w-50"
                                />
                              )}
                            </>
                          ) : (
                            <Field
                              type="file"
                              accept="image/*"
                              name="wideImg"
                              onChange={(event) => {
                                setFieldValue("wideImg", event.target.files[0]);
                                handleImageChange("wideImg", event);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 mb-4 mt-4">
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
                          {values?.serviceImg ? (
                            <>
                              <div className="d-flex">
                                <button
                                  className="btn-blog mt-4 mb-4 w-25"
                                  onClick={() =>
                                    setShowPreviewImage(!showPreviewImage)
                                  }
                                >
                                  {showPreviewImage ? "close" : "preview Image"}
                                </button>
                                {showPreviewImage && (
                                  <button
                                    type="button"
                                    className="btn-blog mt-4 mb-4 w-25 ml-3"
                                    onClick={() => {
                                      setFieldValue("serviceImg", "");
                                      handleImageRemove("serviceImg");
                                    }}
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                              {showPreviewImage && (
                                <img
                                  src={
                                    selectedImage?.serviceImg ||
                                    values?.serviceImg
                                  }
                                  alt="imgg"
                                  className="w-50"
                                />
                              )}
                            </>
                          ) : (
                            <Field
                              type="file"
                              accept="image/*"
                              name="serviceImg"
                              onChange={(event) => {
                                setFieldValue(
                                  "serviceImg",
                                  event.target.files[0]
                                );
                                handleImageChange("serviceImg", event);
                              }}
                            />
                          )}
                        </div>
                        {workData?.services.length > 0 ? (
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
                                    as="textarea"
                                    rows="4"
                                    name={`services[${service}].serviceDecription`}
                                    placeholder="Post Heading"
                                    className="border border-secondary"
                                  />
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <div className="col-lg-12 col-md-12 mb-4">
                            <div className="controls blog-form">
                              <div className="blog-box p-4">
                                <div className="form-group d-flex flex-column">
                                  <label htmlFor="heading">Service Title</label>
                                  <Field
                                    id="heading"
                                    type="text"
                                    name="serviceTitle"
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
                                    type="text"
                                    name="serviceDecription"
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
                                    name="serviceIconClass"
                                    placeholder="Post Heading"
                                    className="border border-secondary"
                                  />
                                </div>
                                <button
                                  type="button"
                                  className="btn_post-content"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12 mb-4 mt-4">
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
                          {values?.outcomeImg ? (
                            <>
                              <div className="d-flex">
                                <button
                                  type="button"
                                  className="btn-blog mt-4 mb-4 w-25"
                                  onClick={() =>
                                    setShowPreviewImage(!showPreviewImage)
                                  }
                                >
                                  {showPreviewImage ? "close" : "preview Image"}
                                </button>
                                {showPreviewImage && (
                                  <button
                                    className="btn-blog mt-4 mb-4 w-25 ml-3"
                                    onClick={() => {
                                      setFieldValue("outcomeImg", "");
                                      handleImageRemove("outcomeImg");
                                    }}
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                              {showPreviewImage && (
                                <img
                                  src={
                                    selectedImage?.outcomeImg ||
                                    values?.outcomeImg
                                  }
                                  alt="imgg"
                                  className="w-50"
                                />
                              )}
                            </>
                          ) : (
                            <Field
                              type="file"
                              accept="image/*"
                              name="outcomeImg"
                              onChange={(event) => {
                                setFieldValue(
                                  "outcomeImg",
                                  event.target.files[0]
                                );
                                handleImageChange("outcomeImg", event);
                              }}
                            />
                          )}
                        </div>
                        {workData?.outcomes.length > 0 ? (
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
                                    as="textarea"
                                    rows="4"
                                    name={`outcomes[${outcome}].outcomeDescription`}
                                    placeholder="Post Heading"
                                    className="border border-secondary"
                                  />
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <div className="col-lg-12 col-md-12 mb-4">
                            <div className="controls blog-form">
                              <div className="blog-box p-4">
                                <div className="form-group d-flex flex-column">
                                  <label htmlFor="heading">Outcome Title</label>
                                  <Field
                                    id="heading"
                                    type="text"
                                    name="outcomeTitle"
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
                                    type="text"
                                    name="outcomeDescription"
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
                                    name="outcomeIconClass"
                                    placeholder="Post Heading"
                                    className="border border-secondary"
                                  />
                                </div>
                                <button
                                  type="button"
                                  className="btn_post-content"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
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
