import React from "react";

const MailPreviewModal = ({ values, onClose, emailBody }) => {
  return (
    <>
      <div className="mail__preview-container">
        <div className="text-dark">
          <div className="d-flex">
            <p>To:</p>
            <p className="text-dark ml-1">{values.recipient}</p>
          </div>
          <div className="d-flex">
            <p>Subject:</p>
            <p className="text-dark ml-1">{values.subject}</p>
          </div>
          <div className="d-flex">
            <p>Body:</p>
            <p className="text-dark ml-1">{emailBody}</p>
          </div>
        </div>
        <div className="d-flex justify-content-end mr-3 mt-2">
          <buttoon
            className="btn btn-secondary btn__mail-close"
            onClick={onClose}
          >
            Close
          </buttoon>
        </div>
      </div>
      <div className="confirm_bg"></div>
    </>
  );
};

export default MailPreviewModal;
