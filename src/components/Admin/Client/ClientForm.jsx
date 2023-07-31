import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ClientForm = () => {
  const [works, setWorks] = useState([]);
  const [notification, setNotification] = useState("");
  const [errMessage, setErrMessage] = useState(null);
  const router = useRouter();
  const validateForm = (formValues) => {
    if (
      !formValues.name ||
      !formValues.location ||
      !formValues.description ||
      !formValues.negatives ||
      !formValues.positives ||
      !formValues.contactName ||
      !formValues.contactDesignation ||
      !formValues.contactMail
    ) {
      setErrMessage("Please fill in all fields");
      return false;
    }
    if (formValues.name.length < 3) {
      setErrMessage("Name must be at least 3 characters");
      return false;
    }
    if (formValues.description.length < 10) {
      setErrMessage("Description must be at least 10 characters");
      return false;
    }
    if (formValues.contactName.length < 3) {
      setErrMessage("ContactName must be atleast three characters Long");
      return false;
    }
    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.contactMail)
    ) {
      setErrMessage("Email is invalid");
      return false;
    }

    return true;
  };

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
    if (data) {
      setWorks(data);
    } else {
      setNotification(error);
    }
  };

  const saveClient = async (values) => {
    console.log(values);
    const response = await fetch("/api/client/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: values }),
    });
    const { message, error } = await response.json();
    if (error) {
      setNotification(error);
    } else {
      setNotification(message);
    }
    clearNotification();
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (validateForm(values)) {
        setSubmitting(false);
        await saveClient(values);
        setNotification("Client saved successfully");
        resetForm();
        setTimeout(() => {
          router.push("/admin");
          setNotification("");
        }, 2000);
      }
    } catch (error) {
      // setNotification(error);
      clearNotification();
    }
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
                    {errMessage && <div className="messages">{errMessage}</div>}
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
                            <label htmlFor="ContactMail">Contact Mail</label>
                            <Field
                              type="email"
                              id="ContactMail"
                              name="contactMail"
                              placeholder="johndoe@gmail.com"
                              required="required"
                              value={values.contactMail}
                            />
                          </div>
                          <div className="form-group d-flex flex-column">
                            <label htmlFor="Secondary">Secondary Mail</label>
                            <Field
                              type="email"
                              id="Secondary"
                              name="secondaryMail"
                              placeholder="doe34@gmail.com"
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
