import db from "../../../config/fire-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

const BlogForm = () => {
  const [errMessage, setErrMessage] = useState(null);
  const [notification, setNotification] = useState();

  const initialValues = {
    title: "",
    tags: "",
    content: "",
  };

  const validateForm = (formValues) => {
    if (!formValues.title || !formValues.tags || !formValues.content) {
      setErrMessage("Please fill in all fields");
      return false;
    }
    if (formValues.title.length < 5) {
      setErrMessage("Name must be at least 5 characters");
      return false;
    }
    if (formValues.tags.length < 5) {
      setErrMessage("Name must be at least 5 characters");
      return false;
    }
    if (formValues.content.length < 10) {
      setErrMessage("Message must be at least 10 characters");
      return false;
    }
    return true;
  };

  const createBlog = async ({ title, tags, content }) => {
    const blogCollection = collection(db, "blogs");
    const res = await addDoc(blogCollection, {
      title,
      tags,
      content,
      date: serverTimestamp(),
    });
    setNotification("Blogpost created successfully");
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (validateForm(values)) {
      console.log(JSON.stringify(values));
      setErrMessage(null);
      setSubmitting(false);
      createBlog(values);
      resetForm();
    }
  };
  return (
    <>
      {/* <section className="page-header crs"> */}
      <div className="container mt-2">
        <div className="row justify-content-start">
          <div className="col-lg-8 col-md-7">
            <div className="cont text-dark mb-3 blg-head">Create Blog</div>
            {notification}

            <div className="blog-box p-4 w-75">
              <Formik
                const
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                <Form>
                  {errMessage && <div className="messages">{errMessage}</div>}

                  <div className="controls blog-form">
                    <div className="form-group d-flex flex-column">
                      <label htmlFor="Title">Title</label>
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
                      <label htmlFor="Tag">Tag</label>
                      <Field
                        id="form_tag"
                        type="text"
                        name="tags"
                        placeholder="Technology, Real Estate"
                        required="required"
                      />
                    </div>

                    <div className="form-group d-flex flex-column">
                      <label htmlFor="content">Content</label>
                      <Field
                        as="textarea"
                        id="form_content"
                        name="content"
                        placeholder="Content"
                        rows="4"
                        required="required"
                      />
                    </div>

                    <button type="submit" className="btn-blog">
                      <span>Create</span>
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
          <div className="row-lg-3 row-md-2 w-25 d-flex flex-column justify-content-around">
            <div className="blog-box p-4 w-100">
              <h4 className="text-dark">Author Info</h4>
              <Formik
                const
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                <Form>
                  {errMessage && <div className="messages">{errMessage}</div>}

                  <div className="controls blog-form">
                    <div className="form-group d-flex flex-column">
                      <label htmlFor="Title">Name</label>
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
                      <label htmlFor="Tag">About</label>
                      <Field
                        id="form_tag"
                        type="text"
                        name="tags"
                        placeholder="Technology, Real Estate"
                        required="required"
                      />
                    </div>
                    <div className="form-group d-flex flex-column">
                      <label htmlFor="Tag">Add Image</label>
                      <input type="file" />
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
            <div className="blog-box p-4 w-100">
              <h4 className="text-dark">Author Info</h4>
              <Formik
                const
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                <Form>
                  {errMessage && <div className="messages">{errMessage}</div>}

                  <div className="controls blog-form">
                    <div className="form-group d-flex flex-column">
                      <label htmlFor="Title">Name</label>
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
                      <label htmlFor="Tag">About</label>
                      <Field
                        id="form_tag"
                        type="text"
                        name="tags"
                        placeholder="Technology, Real Estate"
                        required="required"
                      />
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogForm;
