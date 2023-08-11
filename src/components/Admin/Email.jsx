import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MailPreviewModal from "../Modals/MailPreviewModal";

const Email = ({ clientId }) => {
  const [errMessage, setErrMessage] = useState(null);
  const [notification, setNotification] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [clientData, setClientData] = useState(null);
  const [emailBody, setEmailBody] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [template, setTemplate] = useState("");

  const router = useRouter();
  const initialValues = {
    recipient: clientData?.contactMail,
    subject: template?.subject || "",
    body: emailBody,
  };

  const clearNotification = () => {
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const handlePreview = () => {
    !previewMode ? setPreviewMode(true) : setPreviewMode(false);
  };

  const handleClosePreview = () => {
    setPreviewMode(false);
  };

  const handleOnChange = (event) => {
    setEmailBody(event.target.value);
  };
  const getClientDetails = async () => {
    const clientRes = await fetch(`/api/client/${clientId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data, error } = await clientRes.json();
    !error && setClientData(data);
  };

  const replacePlaceholders = (template, data) => {
    console.log(data);
    let replacedTemplate = template;

    replacedTemplate = replacedTemplate?.replace(
      "[contact1]",
      data.contactName
    );
    replacedTemplate = replacedTemplate?.replace("[positive]", data.positives);
    replacedTemplate = replacedTemplate?.replace("[negative]", data.negatives);
    replacedTemplate = replacedTemplate?.replace(
      /\[business_name]/g,
      data.businessName
    );

    return replacedTemplate;
  };

  const getEmailTemplate = async () => {
    console.log(templateId);
    const response = await fetch(`/api/mail-template/${templateId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data, error } = await response.json();
    if (data) {
      setTemplate(data);
      const mailBody = await data.body;
      const replacedTemplate = await replacePlaceholders(mailBody, clientData);
      setEmailBody(replacedTemplate);
    }
  };

  useEffect(() => {
    getClientDetails();
  }, []);

  useEffect(() => {
    if (clientData) {
      setTemplateId(clientData.template[0]);
      getEmailTemplate();
    }
  }, [clientData, template]);

  const handleSubmit = async (values) => {
    const mailRes = await fetch("/api/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: values, body: emailBody }),
    });
    const { message, error } = await mailRes.json();
    !error ? setNotification(message) : setNotification(error);
    clearNotification();
    if (mailRes.ok) {
      console.log("Entered");
      const clientRes = await fetch("/api/client/client", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: clientData.id }),
      });
      const { message, error } = await clientRes.json();
      !error ? setNotification(message) : setNotification(error);
      clearNotification();
      router.push("/admin");
    }
  };
  {
    !clientData && <div>Loading...</div>;
  }
  return (
    <>
      <div className="container mt-2">
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
                <div className="col-lg-12 col-md-10">
                  <div className="blog-box p-4">
                    <div className="text-dark mb-3 blg-head">Send Mail</div>
                    {errMessage && <div className="messages">{errMessage}</div>}
                    <div className="controls blog-form">
                      <div className="form-group d-flex">
                        <label className="rcpnt" htmlFor="RecipientMail">
                          Recipient:{" "}
                        </label>
                        <Field
                          type="email"
                          id="RecipientMail"
                          name="recipient"
                          placeholder="johndoe@gmail.com"
                          required="required"
                          value={values.recipient}
                        />
                      </div>
                      <div className="form-group d-flex">
                        <label className="sub" htmlFor="Subject">
                          Subject:
                        </label>
                        <Field
                          id="Subject"
                          type="text"
                          name="subject"
                          placeholder="subject for the mail"
                          required="required"
                          value={values.subject}
                        />
                      </div>

                      <div className="form-group d-flex mail">
                        <label className="bdy" htmlFor="Body">
                          Body:{" "}
                        </label>
                        <textarea
                          className="mail_body"
                          id="Body"
                          placeholder="Body"
                          rows="4"
                          required="required"
                          onChange={handleOnChange}
                          value={emailBody}
                        />
                      </div>
                      <div className="d-flex justify-content-between">
                        <button
                          type="button"
                          className="btn-blog"
                          onClick={handlePreview}
                        >
                          <span>Preview</span>
                        </button>
                        <button type="submit" className="btn-blog">
                          <span>Send</span>
                        </button>
                      </div>
                      {previewMode && (
                        <MailPreviewModal
                          emailBody={emailBody}
                          values={values}
                          onClose={handleClosePreview}
                        />
                      )}
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

export default Email;
