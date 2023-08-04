import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const MailTemplate = ({ clientId }) => {
  const [notification, setNotification] = useState("");

  const router = useRouter();

  const initialValues = {
    subject: "",
    body: "",
    employees: "",
  };

  const clearNotification = () => {
    setTimeout(() => {
      router.push("/admin/templates");
      setNotification("");
    }, 2000);
  };

  const handleSubmit = async (values) => {
    const result = await fetch("/api/mail-template", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: values }),
    });
    const { message, error } = await result.json();
    !error ? setNotification(message) : setNotification(error);
    clearNotification();
  };
  return (
    <>
      <div className="container mt-2">
        {notification && <div className="notification">{notification}</div>}
        <Formik const initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, setFieldValue }) => (
            <Form>
              <div className="row mb-4 mt-4">
                <div className="col-lg-11 col-md-10 mx-auto my-auto">
                  <div className="blog-box p-4 mx-auto">
                    <div className="text-dark mb-3 blg-head text-center">
                      Create Mail Template
                    </div>
                    <div className="controls blog-form mx-4">
                      <div className="form-group">
                        <label className="sub" htmlFor="Subject">
                          Subject:
                        </label>
                        <Field
                          id="Subject"
                          type="text"
                          name="subject"
                          placeholder="subject for the mail"
                          required="required"
                        />
                      </div>
                      <div className="form-group mail">
                        <label className="mr-1" htmlFor="Body">
                          Body:
                        </label>
                        <Field
                          as="textarea"
                          name="body"
                          className="mail_body"
                          id="Body"
                          placeholder="Body"
                          rows="4"
                          required="required"
                        />
                      </div>
                      <div className="">
                        <button type="submit" className="btn-blog">
                          <span>Create</span>
                        </button>
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

export default MailTemplate;
