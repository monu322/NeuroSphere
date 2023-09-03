import React, { useState } from "react";

const ClientShimmer = () => {
  const [shimmer] = useState(Array(10).fill(""));
  console.log;
  return (
    <div className="row text-dark">
      <div className="col-lg-12">
        <div className="bg-white">
          <table className="table__style">
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Employees</th>
                <th>Email</th>
                <th>Industry</th>
              </tr>
            </thead>
            <tbody>
              {shimmer.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="shimmer__data">
                      <span></span>
                    </td>
                    <td className="shimmer__data">
                      <span></span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="shimmer__company-logo mr-2">
                          <i className="shimmer__company-logo"></i>
                        </div>
                        <div className="links">
                          <p className="shimmer__company-name"></p>
                          <div className="shimmer__company-links">
                            <a href="#">
                              <i className="mr-1 shimmer__item"></i>
                            </a>
                            <a href="#">
                              <i className="mr-1 shimmer__item"></i>
                            </a>
                            <a href="#">
                              <i className="shimmer__item"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="shimmer__data">
                      <span></span>
                    </td>
                    <td className="shimmer__data">
                      <span></span>
                    </td>
                    <td className="shimmer__data">
                      <span></span>
                    </td>
                    <td className="shimmer__data">
                      <span></span>
                    </td>
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

export default ClientShimmer;
