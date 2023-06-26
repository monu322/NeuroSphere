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
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-9">
            <div className="cont text-center h2 text-secondary">
              Create Blog
            </div>
            {notification}

            <div className="border border-secondary rounded border-2 p-4 w-75">
              {" "}
              {/* mb-100 */}
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

                    <button type="submit" className="btn-curve btn-lit">
                      <span>Create</span>
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
      {/* </section> */}
      {/* <div className="col-lg-6">
        <div className="form md-mb50">
          <h4 className="extra-title mb-50">Get In Touch.</h4>
        </div>
      </div> */}
    </>
  );
};

export default BlogForm;
