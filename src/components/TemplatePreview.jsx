import Link from "next/link";
import React from "react";

const TemplatePreviewModal = ({ filteredTemplate, onDeleteClick }) => {
  console.log(filteredTemplate);
  return (
    <div className="col-lg-8 col-md-8 bg-white template__col-2">
      <div className="template__preview-heading pb-3">Template Preview</div>
      <div className="w-100 d-flex align-items-center px-3 my-2">
        <p className="template__preview--subtitle">Subject:</p>
        <h5 className="template__preview-subject ml-2 template__text">
          {filteredTemplate[0].subject}
        </h5>
      </div>
      <div className="p-3 rounded mail__box mb-2">
        <div className="mt-1 d-flex template__preview-body">
          <p className="template__preview--subtitle">Body:</p>
          <p className="template__text bdy ml-2">{filteredTemplate[0].body}</p>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <Link href={`/admin/create-template/${filteredTemplate[0].id}`}>
          <button className="btn btn-success">Edit &rarr;</button>
        </Link>
        <button
          className="btn btn-danger"
          //   onClick={() => handleDelete(filteredTemplate[0].id)}
          onClick={onDeleteClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;
