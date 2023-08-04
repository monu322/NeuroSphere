import React, { useEffect, useState } from "react";

const ListTemplates = () => {
  const [templates, setTemplates] = useState([]);

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
  useEffect(() => {
    getTemplates();
  }, []);
  return (
    <div className="container mt-4">
      <div className="row text-dark">
        <div className="col-lg-11 col-md-10 admin-home">
          <h5>Templates</h5>
        </div>
      </div>
      <div className="row">
        {templates?.map((template, index) => (
          <div className="col-lg-5 col-md-3 m-4 w-20  template__container">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListTemplates;
