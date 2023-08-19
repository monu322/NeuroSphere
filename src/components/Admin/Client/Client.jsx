import React, { useState } from "react";
import Link from "next/link";
import ConfirmModal from "../../Modals/ConfirmModal";
import ButtonsAction from "../Buttons";

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

  const handleOnCancel = () => {
    setShowConfirmBox(false);
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
                            <MailStatus
                              mail={client.status.firstMail}
                              title="First Mail"
                            />
                          </Link>
                          <Link href={`/admin/clients/mail/${client.id}`}>
                            <MailStatus
                              mail={client.status.secondMail}
                              title="Second Mail"
                            />
                          </Link>
                          <MailStatus
                            mail={client.status.replied}
                            title="Replied"
                          />
                          <MailStatus
                            mail={client.status.meetingScheduled}
                            title="Meeting Scheduled"
                          />
                        </div>
                      </td>
                      <td>{client.contactMail}</td>
                      <td>
                        <ButtonsAction
                          to={`clients/${client.id}`}
                          onDeleteClick={handleDelete}
                          data={client.id}
                        />
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
        <ConfirmModal
          onCancel={handleOnCancel}
          onConfirm={handleOnDeleteConfirm}
        />
      )}
    </>
  );
};

export default Client;

const MailStatus = ({ mail, title }) => {
  return (
    <div
      className={mail ? "status green" : "status red"}
      data-toggle="tooltip"
      data-placement="top"
      title={title}
    ></div>
  );
};
