import Link from "next/link";
import React, { useEffect, useState } from "react";

const ListTemplates = () => {
  const [notification, setNotification] = useState("");
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [templates, setTemplates] = useState([]);
  const [filteredTemplate, setFilteredTemplate] = useState();

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
      setFilteredTemplate([data[0]]);
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

  const handleTemplateView = (id) => {
    const filteredData = templates.filter((t) => t.id === id);
    setFilteredTemplate(filteredData);
  };
  useEffect(() => {
    console.log(filteredTemplate);
  }, [filteredTemplate]);

  useEffect(() => {
    getTemplates();
  }, []);

  return (
    <>
      <div className="">
        {notification && <div className="notification">{notification}</div>}
        <div className="row m-4 template">
          <div className="col-lg-3 col-md-3 template__col-1 mr-4">
            <div className="">
              {templates &&
                templates.map((template, index) => (
                  <div
                    className="template__section p-3 mt-2"
                    key={index}
                    onClick={() => handleTemplateView(template.id)}
                  >
                    <h5 className="template__subject">{template.subject}</h5>
                    <p className="template__body">
                      {template.body.split(" ").slice(0, 10).join(" ")}
                    </p>
                  </div>
                ))}
            </div>
            <Link href="/admin/create-template">
              <div className="template__create">Create New Template</div>
            </Link>
          </div>
          {filteredTemplate && (
            <div className="col-lg-8 col-md-8 bg-white template__col-2">
              <div className="template__preview-heading pb-3">
                Template Preview
              </div>
              <div className="w-100 d-flex align-items-center px-3 my-2">
                <p className="template__preview--subtitle">Subject:</p>
                <h5 className="template__preview-subject ml-2 template__text">
                  {filteredTemplate[0].subject}
                </h5>
              </div>
              <div className="p-3 rounded mail__box mb-2">
                <div className="mt-1 d-flex template__preview-body">
                  <p className="template__preview--subtitle">Body:</p>
                  <p className="template__text bdy ml-2">
                    {filteredTemplate[0].body}
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <Link href={`/admin/create-template/${filteredTemplate[0].id}`}>
                  <button className="btn btn-success">Edit &rarr;</button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(filteredTemplate[0].id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
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
