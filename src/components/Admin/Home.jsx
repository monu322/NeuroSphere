import React, { useEffect, useState } from "react";
import Link from "next/link";

const Home = () => {
  const [notification, setNotification] = useState("");
  const [blogData, setBlogData] = useState([]);
  const [workData, setWorkData] = useState([]);

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
    data ? setBlogData(data) : setNotification(error);
    clearNotification();
  };

  const getWorkData = async () => {
    const response = await fetch("/api/work", {
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { data, error } = await response.json();
    data ? setWorkData(data) : setNotification(error);
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
    getWorkData();
  }, []);
  return (
    <div className="container mt-4">
      <div className="row text-dark">
        <div className="col-lg-10 col-md-8 admin-home">
          <h5>Recently Added Blogs</h5>

          <div>
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
                {blogData?.map((blog, index) => {
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
                            <button className="control_btn pen pe-7s-pen mr-2"></button>
                          </a>
                        </Link>
                        <button
                          className="control_btn trash pe-7s-trash mr-2"
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
    </div>
  );
};

export default Home;
