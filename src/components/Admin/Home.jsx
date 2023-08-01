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
    setFilteredData(data.filter((d) => d.isPublished === false));
    setPublishedBlog(data.filter((d) => d.isPublished === true));
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
    const response = await fetch("/api/client/client", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data, error } = await response.json();
    data ? setClientData(data) : setNotification(error);
    clearNotification();
  };

  const handleDelete = async (id) => {
    const response = await fetch("/api/Blog", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const { message, error } = await response.json();
    error ? setNotification(error) : setNotification(message);
    clearNotification();
    getBlogData();
  };

  useEffect(() => {
    getBlogData();
    // getWorkData();
  }, []);
  useEffect(() => {
    getClientData();
  }, [clientData]);

  return (
    <>
      <div className="container mt-4">
        {notification && <div className="notification">{notification}</div>}
        {filteredData[0]?.isPublished === false && (
          <div className="row text-dark">
            <div className="col-lg-10 col-md-8 admin-home">
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
                            <Link href={`/admin/blog/${blog.id}`}>
                              <a>
                                <button className="control_btn pen pe-7s-pen mr-3"></button>
                              </a>
                            </Link>
                            <button
                              className="control_btn trash pe-7s-trash"
                              onClick={() => handleDelete(blog.id)}
                            ></button>
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
          <div className="col-lg-10 col-md-8 admin-home">
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
                          <Link href={`/admin/blog/${blog.id}`}>
                            <button className="control_btn pen pe-7s-pen mr-3"></button>
                          </Link>
                          <button
                            className="control_btn trash pe-7s-trash"
                            onClick={() => handleDelete(blog.id)}
                          ></button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Client data={clientData} />
      </div>
    </>
  );
};

export default Home;
