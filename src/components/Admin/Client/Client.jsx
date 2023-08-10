import React, { useEffect, useState } from "react";
import ClientMailPreview from "../../ClientMailPreview";
import Email from "../Email";
import Link from "next/link";

const Client = ({ data, getClientsData }) => {
  const [notification, setNotification] = useState("");
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const clearNotification = () => {
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const handleDelete = async (id) => {
    setShowConfirmBox(true);
    setDeleteId(id);
  };

  const handleOnDeleteConfirm = async () => {
    const response = await fetch(`/api/client/${deleteId}`, {
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
    getClientsData();
  };

  return (
    <>
      <div className="row text-dark">
        {notification && <div className="notification">{notification}</div>}
        <div className="col-lg-11 col-md-10 admin-home">
          <h5>Clients</h5>

          <div className="bg-white">
            <table className="table__style">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Contact Mail</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((client, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{client.name}</td>
                      {/* <td> */}
                      {/* {blog.postedDate.toDate().toLocaleDateString("en-GB")} */}
                      {/* </td> */}
                      <td>{client.location}</td>
                      <td>{client.description}</td>
                      <td>
                        <div className="d-flex justify-content-between">
                          <Link href={`/admin/clients/mail/${client.id}`}>
                            <div
                              className={
                                client.status.firstMail
                                  ? "status green"
                                  : "status red"
                              }
                              data-toggle="tooltip"
                              data-placement="top"
                              title="First Mail"
                            ></div>
                          </Link>
                          <Link href={`/admin/clients/mail/${client.id}`}>
                            <div
                              className={
                                client.status.secondMail
                                  ? "status green"
                                  : "status red"
                              }
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Second Mail"
                            ></div>
                          </Link>
                          <div
                            className={
                              client.status.replied
                                ? "status green"
                                : "status red"
                            }
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Replied"
                          ></div>
                          <div
                            className={
                              client.status.meetingScheduled
                                ? "status green"
                                : "status red"
                            }
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Meeting Scheduled"
                          ></div>
                        </div>
                      </td>
                      <td>{client.contactMail}</td>
                      <td>
                        <div className="d-flex justify-content-evenly align-items-center">
                          <Link href={`/admin/clients/${client.id}`}>
                            <a>
                              <button className="control_btn fas edit fa-edit mr-3"></button>
                            </a>
                          </Link>
                          <button
                            className="control_btn delete fas fa-trash-alt"
                            onClick={() => handleDelete(client.id)}
                          ></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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

export default Client;
