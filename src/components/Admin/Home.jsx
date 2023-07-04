import React from "react";

const Home = () => {
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
      </div>
    </div>
  );
};

export default Home;
