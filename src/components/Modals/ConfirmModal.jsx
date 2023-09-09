import React from "react";

const ConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <>
      <div className="confirm-container">
        <div className="confirmation-text mt-4">
          Are you sure you want to delete this ?
        </div>
        <div className="btn__container">
          <buttoon className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </buttoon>
          <buttoon className="btn btn-danger" onClick={onConfirm}>
            Delete
          </buttoon>
        </div>
      </div>
      <div className="confirm_bg"></div>
    </>
  );
};

export default ConfirmModal;
