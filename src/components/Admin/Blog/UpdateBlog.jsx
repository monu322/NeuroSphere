import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import db, { storage } from "../../../config/fire-config";
import { serverTimestamp, updateDoc, doc, getDoc } from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PreviewImage from "../../PreviewImage";

const UpdateBlogForm = ({ id }) => {
  const [blogId] = useState(id);
  const [errMessage, setErrMessage] = useState(null);
  const [notification, setNotification] = useState("");
  const [blogData, setBlogData] = useState("");
  const [heading, setHeading] = useState("");
  const [paragraphs, setParagraphs] = useState("");
  const [postContent, setPostContent] = useState([]);

  const router = useRouter();
  const initialValues = {
    img: blogData.img || "",
    title: blogData?.title || "",
    tags: blogData?.tags || "",
    posterAvatar: blogData?.posterAvatar || "",
    posterName: blogData?.posterName || "",
    postDescriptions: blogData?.postDescriptions || "",
    postMeta: blogData?.postMeta || "",
  };

  const validateForm = (formValues) => {
    if (!formValues.title || !formValues.postDescriptions) {
      setErrMessage("Please fill in all fields");
      return false;
    }
    if (formValues.title.length < 5) {
      setErrMessage("Title must be at least 5 characters");
      return false;
    }
    if (formValues.tags.length < 2) {
      setErrMessage("Tags must be atleast two characters");
      return false;
    }
    if (formValues.postDescriptions.length < 10) {
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

  const handleHeadingChange = (event) => {
    setHeading(event.target.value);
  };
  const handleParagraphsChange = (event) => {
    setParagraphs(event.target.value);
  };

  const addPostContent = (event) => {
    const postData = {
      heading,
      paragraphs: paragraphs.split("."),
    };
    setPostContent([...postContent, postData]);
    setHeading("");
    setParagraphs("");
  };

  const updateBlog = async (values, postContent) => {
    const storageRef = ref(
      storage,
      `blogImages/${values.img.name + values.img.size}`
    );

    await uploadBytes(storageRef, values.img);
    const image = await getDownloadURL(storageRef);
    const response = await fetch("/api/Blog", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values,
        image,
        postContent,
        blogId,
      }),
    });
    const { message, error } = await response.json();
    !error ? setNotification(message) : setErrMessage(error);
    clearNotification();
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (validateForm(values)) {
      setErrMessage(null);
      setSubmitting(false);
      await updateBlog(values, postContent);
      setTimeout(() => {
        router.push("/admin");
        setNotification("");
      }, 2000);
    }
  };

  const getBlogDataWithId = async (id) => {
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setBlogData(docSnap.data());
    } else {
      console.log("No such document");
    }
  };
  console.log(blogData);

  useEffect(() => {
    if (id) {
      getBlogDataWithId(id);
    }
  }, [id]);

  const isButtonDisabled = !heading || !paragraphs;

  return (
    <>
      <div className="container mt-2">
        {notification && <div className="notification">{notification}</div>}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form>
              <div className="d-flex justify-content-between">
                <div className="text-dark mb-3 blg-head">Update Blog</div>
                <div>
                  <button type="submit" className="btn-blog">
                    <span>Update</span>
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-7 col-md-7">
                  <div className="blog-box p-4">
                    {errMessage && (
                      <div className="form_Messages text-danger">
                        {errMessage}
                      </div>
                    )}

                    <div className="controls blog-form">
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="Title">Blog Title</label>
                        <Field
                          id="form_title"
                          type="text"
                          name="title"
                          placeholder="Blog Title"
                          required="required"
                          className="border border-secondary"
                        />
                      </div>

                      <div className="form-group d-flex flex-column">
                        <div>
                          <label htmlFor="postDescriptions">
                            Post Description
                          </label>
                          <Field
                            required="required"
                            as="textarea"
                            type="text"
                            id="postDescriptions"
                            name="postDescriptions"
                            placeholder="Post Description"
                          />
                        </div>
                      </div>

                      <div className="form-group d-flex flex-column">
                        <h4 className="text-dark">Post Content</h4>
                        <div className="controls blog-form">
                          <div className="form-group d-flex flex-column">
                            <label htmlFor="heading">Heading</label>
                            <input
                              id="heading"
                              type="text"
                              value={heading}
                              onChange={handleHeadingChange}
                              placeholder="Post Heading"
                              className="border border-secondary"
                            />
                          </div>

                          <div className="form-group d-flex flex-column">
                            <label htmlFor="paragraphs">Paragraphs</label>
                            <textarea
                              id="paragraphs"
                              value={paragraphs}
                              onChange={handleParagraphsChange}
                              placeholder="Post Paragraphs"
                              className="border border-secondary post_para"
                            />
                          </div>

                          <button
                            onClick={addPostContent}
                            type="button"
                            className="btn_post-content"
                            disabled={isButtonDisabled}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-3 w-25">
                  <div className="row">
                    <div className="blog-box p-4 w-100 mb-3">
                      {errMessage && (
                        <div className="messages">{errMessage}</div>
                      )}

                      <div className="controls blog-form">
                        <div className="form-group d-flex flex-column">
                          <label htmlFor="Tag">Tags</label>
                          <Field
                            type="text"
                            id="tags"
                            placeholder="Tags"
                            name="tags"
                          />
                        </div>
                        <div className="form-group d-flex flex-column">
                          {/* {values.img && <PreviewImage file={values.img} />} */}
                          {!values.img ? (
                            <label htmlFor="Tag">Add Image</label>
                          ) : (
                            <p>Post Image</p>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                              setFieldValue("img", event.target.files[0]);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="blog-box p-4 w-100 mb-3">
                      {errMessage && (
                        <div className="messages">{errMessage}</div>
                      )}

                      <div className="controls blog-form">
                        <div className="form-group d-flex flex-column">
                          <label htmlFor="posterName">Poster Name</label>
                          <Field
                            id="posterName"
                            type="text"
                            name="posterName"
                            placeholder="Poster Name"
                            className="border border-secondary"
                          />
                        </div>
                        <div className="form-group d-flex flex-column">
                          {values.posterAvatar && (
                            <PreviewImage file={values.posterAvatar} />
                          )}
                          {!values.posterAvatar ? (
                            <label htmlFor="Tag">Add Avatar</label>
                          ) : (
                            <p></p>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                              setFieldValue(
                                "posterAvatar",
                                event.target.files[0]
                              );
                            }}
                          />
                        </div>
                        <div className="form-group d-flex flex-column">
                          <label htmlFor="postMeta">Post Meta</label>

                          <Field
                            id="postMeta"
                            type="text"
                            name="postMeta"
                            placeholder="Post Meta"
                            className="border border-secondary"
                          />
                        </div>
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
};

export default UpdateBlogForm;
