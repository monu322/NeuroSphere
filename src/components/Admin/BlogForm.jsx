import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    content: "",
  });
  const [errMessage, setErrMessage] = useState(null);

  const validateForm = (formValues) => {
    if (!formValues.name || !formValues.email || !formValues.message) {
      setErrMessage("Please fill in all fields");
      return false;
    }
    if (formValues.name.length < 5) {
      setErrMessage("Name must be at least 5 characters");
      return false;
    }
    if (formValues.message.length < 10) {
      setErrMessage("Message must be at least 10 characters");
      return false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
      setErrMessage("Email is invalid");
      return false;
    }
    return true;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (validateForm(values)) {
      setErrMessage(null);
      setTimeout(() => {
        setSubmitting(false);
        setFormData(values);
      }, 400);
    }
  };
  return (
    <>
      <section className="page-header crs">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-9">
              <div className="cont text-center h2">Create Blog</div>

              <div className="border border-secondary rounded border-2 p-4 w-75 mb-100 ">
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    message: "",
                  }}
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
                          type="email"
                          name="text"
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
      </section>
      {/* <div className="col-lg-6">
        <div className="form md-mb50">
          <h4 className="extra-title mb-50">Get In Touch.</h4>
        </div>
      </div> */}
    </>
  );
};

export default BlogForm;
