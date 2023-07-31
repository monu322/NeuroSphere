import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../config/fire-config";
// import clientTemplate from "../email-templates/ClientTemplate";

const ClientMailPreview = ({ id }) => {
  const [clientData, setClientData] = useState("");
  const [emailContent, setEmailContent] = useState({
    clientName: clientData ? clientData.clientName : "",
    clientEmail: clientData ? clientData.clientMail : "",
  });

  const getClientData = async () => {
    const docRef = doc(db, "client", id);
    const docSnap = await getDoc(docRef);
    console.log(docSnap);
    setClientData(docSnap.data());
  };
  const handleEmailSend = async () => {
    await clientTemplate.send({
      template: "clientEmail",
      message: {
        to: clientData.clientMail,
      },
    });
  };

  useEffect(() => {
    getClientData();
  }, []);
  return (
    <>
      <div className="mb-2">
        <h4>Email</h4>
        <p>Dear, {clientData.contactName}</p>
        <p>
          I hope this email finds you well. As a valued client of Neurosphere,
          your satisfaction and feedback are of utmost importance to us. We are
          dedicated to continually enhancing our services and ensuring that we
          exceed your expectations in every interaction.
        </p>
        <p>{clientData.name}</p>
        <p>{clientData.clientDesignation}</p>
        <p>{clientData.contactName}</p>
        <p>{clientData.positives}</p>
        <p>{clientData.negatives}</p>

        <textarea
          value={emailContent.emailContent}
          onChange={(e) =>
            setEmailContent((prevContent) => ({
              ...prevContent,
              emailContent: e.target.value,
            }))
          }
        ></textarea>
        <p>Warm regards,</p>
        <p>John</p>
        <p>Neurosphere</p>
      </div>
      <button
        onClick={handleEmailSend}
        className="btn btn-success mb-3"
        type="button"
      >
        Send
      </button>
    </>
  );
};

export default ClientMailPreview;
