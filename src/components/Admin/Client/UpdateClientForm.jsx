import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const UpdateClientForm = ({ id }) => {
  const [works, setWorks] = useState([]);
  const [notification, setNotification] = useState("");
  const [errMessage, setErrMessage] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [clientDetails, setClientDetails] = useState();
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
    name: clientDetails?.name || "",
    location: clientDetails?.location || "",
    description: clientDetails?.description || "",
    positives: clientDetails?.positives || "",
    negatives: clientDetails?.negatives || "",
    referenceProjects: clientDetails?.works || [],
    template: clientDetails?.template || "",
    contactName: clientDetails?.contactName || "",
    contactDesignation: clientDetails?.contactDesignation || "",
    contactMail: clientDetails?.contactMail || "",
    secondaryMail: clientDetails?.secondaryMail || "",
    recentAchievements: clientDetails?.recentAchievements || "",
    status: {
      firstMail: clientDetails?.status?.firstMail || false,
      secondMail: clientDetails?.status?.secondMail || false,
      replied: clientDetails?.status?.replied || false,
      meetingScheduled: clientDetails?.status?.meetingScheduled || false,
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

  const updateClient = async (values) => {
    console.log(values);
    const response = await fetch(`/api/client/${id}`, {
      method: "PATCH",
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

  const getTemplates = async () => {
    const response = await fetch("/api/mail-template", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data, error } = await response.json();
    if (data) {
      setTemplates(data);
      console.log(data);
    }
  };

  const getClientDetails = async (id) => {
    const response = await fetch(`/api/client/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data, error } = await response.json();
    data && setClientDetails(data);
    error && setNotification(error);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (validateForm(values)) {
        setSubmitting(false);
        await updateClient(values);
        setNotification("Client saved successfully");
        resetForm();
        setTimeout(() => {
          router.push("/admin");
          setNotification("");
        }, 2000);
      }
    } catch (error) {
      setNotification(error);
      clearNotification();
    }
  };

  useEffect(() => {
    if (id) {
      getClientDetails(id);
    }
    getWorks();
    getTemplates();
  }, []);

  useEffect(() => {
    console.log(works);
    console.log(initialValues.referenceProjects);
  }, [works, initialValues.referenceProjects]);

  return (
    <>
      <div className="container mt-2">
        {notification && <div className="notification">{notification}</div>}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="d-flex justify-content-between">
                <div className="text-dark mb-3 blg-head">Update Client</div>
                <div>
                  <button type="submit" className="btn-blog">
                    <span>Update</span>
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
                <div className="col-lg-12 col-md-11">
                  <div className="controls blog-form">
                    <div className="blog-box p-4">
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="Achievement">
                          Recent Business Achievements
                        </label>
                        <Field
                          as="textarea"
                          type="email"
                          id="Achievement"
                          name="recentAchievements"
                          placeholder="Recently achieved"
                          required="required"
                          value={values.recentAchievements}
                        />
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
                      <h4 className="text-dark fs-5">Select Template</h4>
                      <div className="">
                        {templates?.map((template, index) => (
                          <div role="group" key={index}>
                            <label className="d-flex justify-content-evenly flex-wrap">
                              <div className="mr-1">
                                <Field
                                  type="checkbox"
                                  name="template"
                                  value={template.id}
                                />
                              </div>
                              <div className="text-secondary">
                                {template.subject}
                              </div>
                            </label>
                          </div>
                        ))}
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
                      <div className="d-flex justify-content-between flex-wrap">
                        {works?.map((work, index) => (
                          <div role="group" key={index} className="mr-3">
                            <label className="d-flex justify-content-evenly flex-wrap">
                              <div className="mr-1">
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

export default UpdateClientForm;
