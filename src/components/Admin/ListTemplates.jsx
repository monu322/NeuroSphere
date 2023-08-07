import Link from "next/link";
import React, { useEffect, useState } from "react";

const ListTemplates = () => {
  const [notification, setNotification] = useState("");
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [templates, setTemplates] = useState([]);

  const clearNotification = () => {
    setTimeout(() => {
      setNotification("");
    }, 2000);
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

  const handleDelete = async (id) => {
    setShowConfirmBox(true);
    setDeleteId(id);
  };

  const handleOnDeleteConfirm = async () => {
    const response = await fetch("/api/mail-template", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: deleteId }),
    });
    const { message, error } = await response.json();
    error ? setNotification(error) : setNotification(message);
    clearNotification();
    setShowConfirmBox(false);
    getTemplates();
  };

  useEffect(() => {
    getTemplates();
  }, []);
  return (
    <>
      <div className="container mt-4">
        {notification && <div className="notification">{notification}</div>}
        <div className="row text-dark">
          <div className="col-lg-12 col-md-10 admin-home">
            <div className="d-flex justify-content-between">
              <h4 className="blg-head">Email Templates</h4>
              <Link href="/admin/template">
                <button type="button" className="btn-blog ">
                  Create
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          {templates?.map((template, index) => (
            <div
              key={index}
              className="col-lg-5 col-md-3 m-4 w-20  template__container"
            >
              <div className="template__head">
                <div className="d-flex px-3 py-1">
                  <p className="text-white-50 mr-2">Subject:</p>
                  <p className="text-white">{template.subject}</p>
                </div>
              </div>
              <div className="template__box">
                <div className="px-2 py-1" key={index}>
                  <div className="text-dark">
                    <p>Body:</p>
                    <p className="text-dark">{template.body}</p>
                  </div>
                  <div className="d-flex mt-3 justify-content-between">
                    <Link href={`/admin/template/${template.id}`}>
                      <button className="btn btn-success">Edit</button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(template.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showConfirmBox && (
        <div>
          <div className="confirm-container">
            <div className="confirmation-text mt-4">
              Are you sure you want to delete this ?
            </div>
            <div className="btn__container">
              <buttoon
                className="btn btn-secondary"
                onClick={() => setShowConfirmBox(false)}
              >
                Cancel
              </buttoon>
              <buttoon
                className="btn btn-danger"
                onClick={handleOnDeleteConfirm}
              >
                Delete
              </buttoon>
            </div>
          </div>
          <div className="confirm_bg"></div>
        </div>
      )}
    </>
  );
};

export default ListTemplates;
