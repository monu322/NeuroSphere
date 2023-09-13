import React from "react";

const ConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <>
      <div className="confirm-container">
        <div className="confirmation-text mt-4">
          Are you sure you want to delete this ?
        </div>
        <div className="btn__container">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
      <div className="confirm_bg"></div>
    </>
  );
};

export default ConfirmModal;
