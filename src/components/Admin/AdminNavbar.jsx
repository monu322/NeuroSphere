import Link from "next/link";
import React from "react";
import { Row, Col } from "reactstrap";
import { Nav, NavItem, NavLink } from "reactstrap";

const AdminNavbar = () => {
  return (
    <div className="admin-nav">
      <div className="admin flex flex-col justify-evenly pl-5 pt-3 sticky top-0">
        <div className="logo mb-4">
          <img src="/assets/img/neurosphere-logo.svg" alt="Neurosphere Logo" />
        </div>
        <ul>
          <li className="nav-item ">
            <NavLink className="nav-align">
              <span className="icon pe-7s-home"></span>
              <span>Home</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-align">
              <span className="icon pe-7s-next-2"></span>
              <span>Create Blogs</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-align">
              <span className="icon pe-7s-portfolio"></span>
              <span>Add Openings</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-align">
              <span className="icon pe-7s-browser"></span>
              <span>Add Works</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-align">
              <span className="icon pe-7s-browser"></span>
              <span>Add Works</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-align">
              <span className="icon pe-7s-browser"></span>
              <span>Add Works</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-align">
              <span className="icon pe-7s-browser"></span>
              <span>Add Works</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-align">
              <span className="icon pe-7s-browser"></span>
              <span>Add Works</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavbar;
