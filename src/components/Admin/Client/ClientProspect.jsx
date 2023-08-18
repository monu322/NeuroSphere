import Image from "next/image";
import React, { useState } from "react";

const ClientProspect = () => {
  const [company, setCompany] = useState();
  const [location, setLocation] = useState();
  const [category, setCategory] = useState();
  const [employees, setEmployees] = useState();
  console.log(company, location, category, employees);
  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-lg-12">
          <div className="blog-box p-3">
            <div className="d-flex text-dark ">
              <SetField
                handleChange={(e) => setCompany(e.target.value)}
                title="Company"
                value={company}
                icon="building"
              />
              <SetField
                handleChange={(e) => setLocation(e.target.value)}
                title="Location"
                value={location}
                icon="map-marker-alt"
              />
              <SetField
                handleChange={(e) => setCategory(e.target.value)}
                title="Category"
                value={category}
                icon="tag"
              />
              <SetField
                handleChange={(e) => setEmployees(e.target.value)}
                title="Employees"
                value={employees}
                icon="user"
              />
            </div>
          </div>
        </div>
      </div>
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
                <tr>
                  <td className="text-primary">Robert Gates</td>
                  <td>Principal Could Solution Architect</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="company-logo mr-2">
                        <i className="fab fa-microsoft company-logo"></i>
                      </div>
                      <div className="links">
                        <p className="company-name">Microsoft</p>
                        <div className="company-links">
                          <a href="#">
                            <i class="fab fa-linkedin mr-1 item-1"></i>
                          </a>
                          <a href="#">
                            <i class="fab fa-facebook-square mr-1 item-2"></i>
                          </a>
                          <a href="#">
                            <i class="fab fa-twitter-square item-3"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>Charleston</td>
                  <td>22600</td>
                  <td>robert@gmail.com</td>
                  <td>Information Technology</td>
                </tr>
                <tr>
                  <td className="text-primary">Jeff Weiner</td>
                  <td>Executive Chairman</td>
                  <td>
                    {" "}
                    <div className="d-flex align-items-center">
                      <div className="company-logo mr-2">
                        <i className="fab fa-linkedin company-logo"></i>
                      </div>
                      <div className="links">
                        <p className="company-name">Linkedin</p>
                        <div className="company-links">
                          <a href="#">
                            <i class="fab fa-linkedin mr-1 item-1"></i>
                          </a>
                          <a href="#">
                            <i class="fab fa-facebook-square mr-1 item-2"></i>
                          </a>
                          <a href="#">
                            <i class="fab fa-twitter-square item-3"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>United States</td>
                  <td>2600</td>
                  <td>jeff@gmail.com</td>
                  <td>Information Technology</td>
                </tr>
                <tr>
                  <td className="text-primary">Mike Bloomberg</td>
                  <td>Founder</td>
                  <td>
                    {" "}
                    <div className="d-flex align-items-center">
                      <div className="company-logo mr-2">
                        <i className="fab fa-microsoft company-logo"></i>
                      </div>
                      <div className="links">
                        <p className="company-name">Bloomberg</p>
                        <div className="company-links">
                          <a href="#">
                            <i class="fab fa-linkedin mr-1 item-1"></i>
                          </a>
                          <a href="#">
                            <i class="fab fa-facebook-square mr-1 item-2"></i>
                          </a>
                          <a href="#">
                            <i class="fab fa-twitter-square item-3"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>New York</td>
                  <td>28000</td>
                  <td>mike@gmail.com</td>
                  <td>Financial Services</td>
                </tr>
                <tr>
                  <td className="text-primary">Robert Gates</td>
                  <td>Principal Could Solution Architect</td>
                  <td>
                    {" "}
                    <div className="d-flex align-items-center">
                      <div className="company-logo mr-2">
                        <i className="fab fa-facebook company-logo"></i>
                      </div>
                      <div className="links">
                        <p className="company-name">FaceBook</p>
                        <div className="company-links">
                          <a href="#">
                            <i class="fab fa-linkedin mr-1 item-1"></i>
                          </a>
                          <a href="#">
                            <i class="fab fa-facebook-square mr-1 item-2"></i>
                          </a>
                          <a href="#">
                            <i class="fab fa-twitter-square item-3"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>Charleston</td>
                  <td>22600</td>
                  <td>robert@gmail.com</td>
                  <td>Information Technology</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProspect;
const SetField = ({ handleChange, title, value, icon }) => {
  return (
    <div className="client__filter mr-2 p-1">
      <a>
        <i className={`icon fas fa-${icon} mr-1`}></i>
        <label className="mb-0">{title}</label>
      </a>
      <input
        className="input"
        type="text"
        onChange={handleChange}
        value={value}
        placeholder={`Enter ${title}`}
      />
    </div>
  );
};
