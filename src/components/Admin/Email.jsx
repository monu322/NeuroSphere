import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Email = ({ clientId }) => {
  const [errMessage, setErrMessage] = useState(null);
  const [notification, setNotification] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [clientData, setClientData] = useState(null);
  const [emailBody, setEmailBody] = useState("");

  const router = useRouter();
  const initialValues = {
    recipient: clientData?.contactMail,
    subject: "",
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
  useEffect(() => {
    getClientDetails();
  }, []);
  useEffect(() => {
    if (clientData) {
      const template = `Hello ${clientData?.contactName || ""},

lorem ipsum dolor sit amet, consectetur adip nonum soc et dolore magna aliquet er at,
consectetur adip nonum soc et dolor in diam nonum soc et dolor in diam nonum soc et dolor 
in diam nonum soc et dolor in diam nonum soc et dolor.

Best Regards,
Neurosphere
`;
      setEmailBody(template);
    }
  }, [clientData]);

  const handleSubmit = async (values) => {
    const mailRes = await fetch("/api/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: values, body: emailBody }),
    });
    console.log(mailRes);
    const { message, error } = await mailRes.json();
    !error ? setNotification(message) : setNotification(error);
    clearNotification();
    if (true) {
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
      //   router.push("/admin");
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
                          value={values.location}
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
                        <div>
                          <h3>Email Preview</h3>
                          <p>Recipient: {values.recipient}</p>
                          <p>Subject: {values.subject}</p>
                          <p>Body: {values.body}</p>
                        </div>
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
