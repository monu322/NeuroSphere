import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

const ClientForm = () => {
  const [works, setWorks] = useState([]);
  const [notification, setNotification] = useState("");
  const clearNotification = () => {
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const initialValues = {
    name: "",
    location: "",
    description: "",
    positives: "",
    location: "",
    negatives: "",
    referenceProjects: [],
    contactName: "",
    contactDesignation: "",
    contactMail: "",
    secondaryMail: "",
    status: {
      firstMail: false,
      secondMail: false,
      replied: false,
      meetingScheduled: false,
    },
  };
  const getWorks = async () => {
    const response = await fetch("/api/work", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data, error } = await response.json();
    data && setWorks(data);
  };

  const handleSubmit = (values) => {
    console.log(values);
  };
  useEffect(() => {
    getWorks();
  }, []);
  useEffect(() => {
    console.log(works);
    console.log(initialValues.referenceProjects);
  }, [works, initialValues.referenceProjects]);
  return (
    <>
      <div className="container mt-2">
        {notification && <div className="notification">{notification}</div>}
        <Formik const initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, setFieldValue }) => (
            <Form>
              <div className="d-flex justify-content-between">
                <div className="text-dark mb-3 blg-head">Add Client</div>
                <div>
                  <button type="submit" className="btn-blog">
                    <span>Add</span>
                  </button>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-lg-6 col-md-6">
                  <div className="blog-box p-4">
                    {/* {errMessage && <div className="messages">{errMessage}</div>} */}
                    <div className="controls blog-form">
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="Name">Name</label>
                        <Field
                          id="form_name"
                          type="text"
                          name="name"
                          placeholder="Name"
                          required="required"
                          value={values.name}
                        />
                      </div>
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="Location">Location</label>
                        <Field
                          id="form_Location"
                          type="text"
                          name="location"
                          placeholder="Location"
                          required="required"
                          value={values.location}
                        />
                      </div>

                      <div className="form-group d-flex flex-column">
                        <label htmlFor="description">Description</label>
                        <Field
                          className="client"
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
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="blog-box p-4">
                        <div className="controls blog-form">
                          <div className="form-group d-flex flex-column">
                            <label htmlFor="Contact Name">Contact Name</label>
                            <Field
                              type="text"
                              id="form_name"
                              name="contactName"
                              placeholder="Contact Name"
                              required="required"
                              value={values.contactName}
                            />
                          </div>
                          <div className="form-group d-flex flex-column">
                            <label htmlFor="Contact Designation">
                              Contact Designation
                            </label>
                            <Field
                              type="text"
                              id="form_designation"
                              name="contactDesignation"
                              placeholder="Designation"
                              required="required"
                              value={values.designation}
                            />
                          </div>
                          <div className="form-group d-flex flex-column">
                            <label htmlFor="COnract Mail">Contact Mail</label>
                            <Field
                              type="text"
                              id="form_mailPrimary"
                              name="contactMail"
                              placeholder="Contact Mail"
                              required="required"
                              value={values.contactMail}
                            />
                          </div>
                          <div className="form-group d-flex flex-column">
                            <label htmlFor="Secondary">Secondary Mail</label>
                            <Field
                              type="text"
                              id="form_mailPrimary"
                              name="secondaryMail"
                              placeholder="Secondary Mail"
                              required="required"
                              value={values.secondaryMail}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-lg-6 col-md-6">
                  <div className="controls blog-form">
                    <div className="blog-box p-4">
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="Positives">Positives</label>
                        <Field
                          id="form_positives"
                          type="text"
                          name="positives"
                          placeholder="Positives"
                          required="required"
                          value={values.positives}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="controls blog-form">
                    <div className="blog-box p-4">
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="Negatives">Negatives</label>
                        <Field
                          id="form_negatives"
                          type="text"
                          name="negatives"
                          placeholder="Negatives"
                          required="required"
                          value={values.negatives}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-lg-12 col-md-11">
                  <div className="controls blog-form">
                    <div className="blog-box p-4">
                      <h4 className="text-dark fs-5">Reference Projects</h4>
                      <div className="d-flex justify-content-between">
                        {works?.map((work, index) => (
                          <div role="group" key={index}>
                            <label className="d-flex">
                              <div className="mr-2">
                                <Field
                                  type="checkbox"
                                  name="referenceProjects"
                                  value={work.title}
                                />
                              </div>
                              <div className="text-secondary">{work.title}</div>
                            </label>
                          </div>
                        ))}
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

export default ClientForm;
