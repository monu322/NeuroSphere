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
      const template = `Dear ${clientData?.contactName || ""},

      I hope this email finds you in good health and high spirits. My name is Mahesh, and I am writing to you as the COO of NeuroSphere, a bespoke software solutions provider specialising in Web, Mobile, AI, and IoT domains. Before I proceed further, allow me to congratulate you regarding the [recent business achievement].
      As a forward-thinking organisation, NeuroSphere is always on the lookout for opportunities to collaborate with ambitious and innovative organisations to address the complex challenges of the modern business landscape. After learning about your company’'s remarkable achievements, it became evident that our shared dedication to technological advancement and problem-solving could potentially lead to a fruitful partnership.
      In light of this, I am eager to know about the technology-related challenges your company is currently facing. Our team at NeuroSphere possesses extensive expertise in crafting tailor-made software solutions that can empower businesses like yours to optimise operations, enhance efficiency, develop innovative solutions and stay ahead of the competition.
      At NeuroSphere, we pride ourselves in fostering growth and success for our clients through innovative solutions. Read about how we have worked with the world largest toy store, Hamley's, increasing their sales using AI & Data, or how we helped the NHS with staff demand prediction. If bespoke end to end solutions is what you are looking for, here is how we helped InfaBytes develop an IoT data analysis platform, currently used by AWS Engineers, and  VapeBot to serve millions of users with a multi platform ecommerce ecosystem.
      I would be delighted to arrange a meeting to discuss these prospects in more detail. This would provide us with a valuable opportunity to understand your company's unique requirements and identify areas where our expertise can offer optimal solutions.
      You can use this link to schedule a meeting with me and my team to discuss your challenges and possible solutions.
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
                          <div className="mail__preview-container">
                            <div className="text-dark">
                              <div className="d-flex">
                                <p>To:</p>
                                <p className="text-dark ml-1">
                                  {values.recipient}
                                </p>
                              </div>
                              <div className="d-flex">
                                <p>Subject:</p>
                                <p className="text-dark ml-1">
                                  {values.subject}
                                </p>
                              </div>
                              <div className="d-flex">
                                <p>Body:</p>
                                <p className="text-dark ml-1">{emailBody}</p>
                              </div>
                            </div>
                            <div className="d-flex justify-content-end mr-3 mt-2">
                              <buttoon
                                className="btn btn-secondary btn__mail-close"
                                onClick={() => setPreviewMode(false)}
                              >
                                Close
                              </buttoon>
                            </div>
                          </div>
                          <div className="confirm_bg"></div>
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
