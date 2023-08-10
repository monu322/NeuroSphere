import React, { useEffect, useState } from "react";
import Link from "next/link";
import Client from "./Client/Client";
import ClientMailPreview from "../ClientMailPreview";

const Home = () => {
  const [notification, setNotification] = useState("");
  const [blogData, setBlogData] = useState([]);
  const [publishedBlog, setPublishedBlog] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isPublished, setIsPublished] = useState(null);
  const [workData, setWorkData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const clearNotification = () => {
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const getBlogData = async () => {
    const response = await fetch("/api/Blog", {
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { data, error } = await response.json();
    console.log(data);
    setFilteredData(data?.filter((d) => d.isPublished === false));
    setPublishedBlog(data?.filter((d) => d.isPublished === true));
    data ? setBlogData(data) : setNotification(error);
    clearNotification();
  };

  // const getWorkData = async () => {
  //   try {
  //     const response = await fetch("/api/work", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     const { data, error } = await response.json();
  //     data ? setWorkData(data) : setNotification(error);
  //     clearNotification();
  //   } catch (error) {
  //     setNotification(error);
  //   }
  // };

  const getClientData = async () => {
    try {
      const response = await fetch("/api/client/client", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data, error } = await response.json();
      if (data) {
        setClientData(data);
      } else {
        setNotification(error);
        clearNotification();
      }
    } catch (error) {
      console.log("Error occured : ", error);
    }
  };

  const handleOnDeleteConfirm = async () => {
    const response = await fetch("/api/Blog", {
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
    getBlogData();
  };

  const handleDelete = async (id) => {
    setShowConfirmBox(true);
    setDeleteId(id);
  };

  useEffect(() => {
    getClientData();
  }, []);

  useEffect(() => {
    getBlogData();
    // getWorkData();
  }, []);
  return (
    <>
      <div className="container mt-4">
        {notification && <div className="notification">{notification}</div>}
        {filteredData && filteredData[0]?.isPublished === false && (
          <div className="row text-dark">
            <div className="col-lg-11 col-md-10 admin-home">
              <h5>Saved Blogs</h5>

              <div className="bg-white">
                <table className="table__style">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Author</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData?.map((blog, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{blog.title}</td>
                          <td>
                            {/* {blog.postedDate.toDate().toLocaleDateString("en-GB")} */}
                          </td>
                          <td>{blog.posterName}</td>
                          <td>
                            <div className="d-flex justify-content-evenly align-items-center">
                              <Link href={`/admin/blog/${blog.id}`}>
                                <a>
                                  <button className="control_btn fas edit fa-edit mr-3"></button>
                                </a>
                              </Link>
                              <button
                                className="control_btn delete fas fa-trash-alt"
                                onClick={() => handleDelete(blog.id)}
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
        )}
        <div className="row text-dark">
          <div className="col-lg-11 col-md-10 admin-home">
            <h5>Recently Published Blogs</h5>

            <div className="bg-white">
              <table className="table__style">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Author</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {publishedBlog?.map((blog, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{blog.title}</td>
                        <td>
                          {/* {blog.postedDate.toDate().toLocaleDateString("en-GB")} */}
                        </td>
                        <td>{blog.posterName}</td>
                        <td>
                          <div className="d-flex justify-content-evenly align-items-center mr-1">
                            <Link href={`/admin/blog/${blog.id}`}>
                              <a>
                                <button className="control_btn fas edit fa-edit mr-3"></button>
                              </a>
                            </Link>
                            <button
                              className="control_btn delete fas fa-trash-alt"
                              onClick={() => handleDelete(blog.id)}
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
        <Client data={clientData} getClientsData={getClientData} />
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

export default Home;
