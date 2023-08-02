import React, { useEffect, useState } from "react";
import ClientMailPreview from "../../ClientMailPreview";
import Email from "../Email";
import Link from "next/link";

const Client = ({ data }) => {
  console.log(data);
  const [mailPreview, setMailPreview] = useState(false);
  const [clientData, setClientData] = useState("");

  //   const handleMailPreview = (client) => {
  //     setClientData(client);
  //     mailPreview === false ? setMailPreview(true) : setMailPreview(false);
  //   };

  return (
    <div className="row text-dark">
      <div className="col-lg-10 col-md-8 admin-home">
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Client;
