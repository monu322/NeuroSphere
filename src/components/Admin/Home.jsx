import React, { useEffect, useState } from "react";
import db from "../../config/fire-config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Link from "next/link";

const Home = () => {
  const [blogData, setBlogData] = useState([]);
  const getBlogData = async () => {
    const blogCollection = collection(db, "blogs");
    const q = query(blogCollection, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      data.push(docData);
    });
    setBlogData(data);
  };
  console.log(blogData);

  useEffect(() => {
    getBlogData();
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
                      <td>{blog.date.toDate().toLocaleDateString("en-GB")}</td>
                      <td>{blog.authorInfo.name}</td>
                      <td>
                        <Link href={"/admin/blog/1"}>
                          <a>
                            <button className="control_btn pen pe-7s-pen mr-2"></button>
                          </a>
                        </Link>
                        <Link href={"/admin/blog/2"}>
                          <a>
                            <button className="control_btn trash pe-7s-trash mr-2"></button>
                          </a>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <div className="row text-dark">
        <div className="col-lg-10 col-md-8">
          <div className="admin-home">
            <h5>Recently Added Works</h5>
            <div className="display-blogs">
              <p>Title</p>
              <span>
                <button className="control_btn pe-7s-trash"></button>
                <button className="control_btn pe-7s-pen"></button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="row text-dark">
        <div className="col-lg-10 col-md-8">
          <div className="admin-home">
            <h5>Recently Added Openings</h5>
            <div className="display-blogs">
              <p>Title</p>
              <span>
                <button className="control_btn pe-7s-trash"></button>
                <button className="control_btn pe-7s-pen"></button>
              </span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
