import Link from "next/link";
import React, { useEffect, useState } from "react";
import ConfirmModal from "../Modals/ConfirmModal";
import TemplatePreviewModal from "../TemplatePreview";

const ListTemplates = () => {
  const [notification, setNotification] = useState("");
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [templates, setTemplates] = useState([]);
  const [filteredTemplate, setFilteredTemplate] = useState(null);

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
  };

  const handleOnDeleteClick = () => {
    setShowConfirmBox(true);
    setDeleteId(filteredTemplate[0].id);
  };

  const handleOnCancel = () => {
    setShowConfirmBox(false);
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
            <TemplatePreviewModal
              filteredTemplate={filteredTemplate}
              onDeleteClick={handleOnDeleteClick}
            />
          )}
        </div>
      </div>
      {showConfirmBox && (
        <ConfirmModal
          onCancel={handleOnCancel}
          onConfirm={handleOnDeleteConfirm}
        />
      )}
    </>
  );
};

export default ListTemplates;
