import React, { useEffect, useState } from "react";
import db from "../../config/fire-config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const Home = () => {
  const [blogData, setBlogData] = useState([]);
  const [workData, setWorkData] = useState([]);

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

  const getWorkData = async () => {
    const workCollection = collection(db, "works");
    const q = query(workCollection, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      data.push(docData);
    });
    setWorkData(data);
  };
  console.log(blogData);
  useEffect(() => {
    getBlogData();
    getWorkData();
  }, []);
  return (
    <div className="container mt-2">
      <div className="row text-dark">
        <div className="col-lg-4 col-md-2">Total Blogs</div>
        <div className="col-lg-4 col-md-2">Total Works</div>
        <div className="col-lg-4 col-md-2">Total Users</div>
      </div>
      <div className="row text-dark">
        <div className="col-lg-10 col-md-8">
          <div className="admin-home">
            <h5>Recently Added Blogs</h5>
            {blogData?.map((blog) => {
              return (
                <div key={blog.title} className="display-blogs">
                  <h6>{blog.title}</h6>
                  <p>{blog.content}</p>
                  {/* <span>{blog.date}</span> */}
                  <span>
                    <button className="control_btn pe-7s-trash"></button>
                    <button className="control_btn pe-7s-pen"></button>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="row text-dark">
        <div className="col-lg-10 col-md-8">
          <div className="admin-home">
            <h5>Recently Added Works</h5>
            {workData?.map((work) => {
              return (
                <div key={work.title} className="display-blogs">
                  <h6>{work.title}</h6>
                  {/* <p>{blog.content}</p> */}
                  {/* <span>{blog.date}</span> */}
                  <span>
                    <button className="control_btn pe-7s-trash"></button>
                    <button className="control_btn pe-7s-pen"></button>
                  </span>
                </div>
              );
            })}
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
      </div>
    </div>
  );
};

export default Home;
