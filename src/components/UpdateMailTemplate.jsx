import { doc, getDoc } from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import db from "../config/fire-config";

const UpdateMailTemplate = ({ id }) => {
  const [templateId] = useState(id);
  const [notification, setNotification] = useState("");
  const [templateData, setTemplateData] = useState("");

  const router = useRouter();

  const initialValues = {
    subject: templateData.subject || "",
    body: templateData.body || "",
    employees: templateData.employees || "",
  };

  const clearNotification = () => {
    setTimeout(() => {
      router.push("/admin/templates");
      setNotification("");
    }, 2000);
  };

  const handleSubmit = async (values) => {
    const result = await fetch("/api/mail-template", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: values, templateId }),
    });
    const { message, error } = await result.json();
    !error ? setNotification(message) : setNotification(error);
    clearNotification();
  };

  const getTemplateData = async (id) => {
    const docRef = doc(db, "templates", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setTemplateData(docSnap.data());
    } else {
      console.log("No template data found");
    }
  };

  useEffect(() => {
    console.log(templateData);
  }, []);
  useEffect(() => {
    if (id) {
      getTemplateData(id);
    }
  }, []);
  return (
    <>
      <div className="container mt-2 head__padding">
        {notification && <div className="notification">{notification}</div>}
        <Formik
          const
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="row mb-4 mt-4">
                <div className="col-lg-11 col-md-10 mx-auto my-auto">
                  <div className="blog-box p-4 mx-auto">
                    <div className="text-dark mb-3 blg-head text-center">
                      Edit Mail Template
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
                          <span>Update</span>
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

export default UpdateMailTemplate;
