import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ClientForm = () => {
  const [works, setWorks] = useState([]);
  const [notification, setNotification] = useState("");
  const [errMessage, setErrMessage] = useState(null);
  const [templates, setTemplates] = useState([]);
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
    template: "",
    contactName: "",
    contactDesignation: "",
    contactMail: "",
    secondaryMail: "",
    recentAchievements: "",
    status: {
      firstMail: 0,
      secondMail: 0,
      replied: 0,
      meetingScheduled: 0,
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

  const getTemplates = async () => {
    const response = await fetch("/api/mail-template/", {
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
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (validateForm(values)) {
        setSubmitting(false);
        await saveClient(values);
        setNotification("Client Created successfully");
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
                      <FormInput
                        label="Name"
                        htmlFor="Name"
                        id="form_name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={values.name}
                      />
                      <FormInput
                        label="Location"
                        htmlFor="Location"
                        id="form_Location"
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={values.location}
                      />
                      <FormInput
                        label="Description"
                        htmlFor="description"
                        className="client"
                        as="textarea"
                        id="form_description"
                        name="description"
                        placeholder="Description"
                        rows="4"
                        value={values.description}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="blog-box p-4">
                        <div className="controls blog-form">
                          <FormInput
                            label="Contact Name"
                            htmlFor="Contact Name"
                            type="text"
                            id="form_name"
                            name="contactName"
                            placeholder="Contact Name"
                            value={values.contactName}
                          />
                          <FormInput
                            label="Contact Designation"
                            htmlFor="Contact Designation"
                            type="text"
                            id="form_designation"
                            name="contactDesignation"
                            placeholder="Designation"
                            value={values.designation}
                          />
                          <FormInput
                            label="ContactMail"
                            htmlFor="Contact Mail"
                            type="email"
                            id="ContactMail"
                            name="contactMail"
                            placeholder="johndoe@gmail.com"
                            value={values.contactMail}
                          />
                          <FormInput
                            label="Secondary Mail"
                            htmlFor="Secondary"
                            type="email"
                            id="Secondary"
                            name="secondaryMail"
                            placeholder="doe34@gmail.com"
                            value={values.secondaryMail}
                          />
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
                      <FormInput
                        label="Recent Business Achievements"
                        htmlFor="Achievement"
                        as="textarea"
                        type="email"
                        id="Achievement"
                        name="recentAchievements"
                        placeholder="Recently achieved"
                        value={values.recentAchievements}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-lg-6 col-md-6">
                  <div className="controls blog-form">
                    <div className="blog-box p-4">
                      <FormInput
                        label="Positives"
                        htmlFor="Positives"
                        id="form_positives"
                        type="text"
                        name="positives"
                        placeholder="Positives"
                        value={values.positives}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="controls blog-form">
                    <div className="blog-box p-4">
                      <FormInput
                        label="Negatives"
                        htmlFor="Negatives"
                        id="form_negatives"
                        type="text"
                        name="negatives"
                        placeholder="Negatives"
                        value={values.negatives}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <FormRow title="Select Templates" templates={templates} />
              <FormRow title="Reference Projects" works={works} />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ClientForm;

const FormInput = ({
  htmlFor,
  label,
  id,
  type,
  name,
  placeholder,
  value,
  as,
  rows,
  className,
}) => {
  return (
    <div className="form-group d-flex flex-column">
      <label htmlFor={htmlFor}>{label}</label>
      <Field
        className={className}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        required="required"
        value={value}
        as={as}
        rows={rows}
      />
    </div>
  );
};

const FormRow = ({ title, templates, works }) => {
  return (
    <div className="row mb-4">
      <div className="col-lg-12 col-md-11">
        <div className="controls blog-form">
          <div className="blog-box p-4">
            <h4 className="text-dark fs-5">{title}</h4>
            <div className="d-flex justify-content-start flex-wrap">
              {templates
                ? templates.map((template, index) => (
                    <FormRowField
                      key={index}
                      index={index}
                      name="template"
                      value={template.id}
                      text={template.subject}
                    />
                  ))
                : works?.map((work, index) => (
                    <FormRowField
                      key={index}
                      index={index}
                      name="referenceProjects"
                      value={work.title}
                      text={work.title}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormRowField = ({ index, name, value, text }) => {
  return (
    <div role="group" key={index}>
      <label className="d-flex justify-content-evenly flex-wrap mr-3">
        <div className="mr-1">
          <Field type="checkbox" name={name} value={value} />
        </div>
        <div className="text-secondary">{text}</div>
      </label>
    </div>
  );
};
