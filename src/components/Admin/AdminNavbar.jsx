import Link from "next/link";
import React from "react";
import { NavLink } from "reactstrap";

const AdminNavbar = () => {
  return (
    <div className="admin-nav ">
      <div className="admin flex flex-col justify-evenly pl-5 pt-3 sticky-top">
        <div className="logo mb-4">
          <Link href="/">
            <img
              className="admin-nav__logo"
              src="/assets/img/neurosphere-logo.svg"
              alt="Neurosphere Logo"
            />
          </Link>
        </div>
        <ul>
          <li className="nav-item ">
            <Link href="/admin" className="nav-align">
              <a>
                <span className="icon pe-7s-home"></span>
                <span>Home</span>
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/blog" className="nav-align">
              <a>
                <span className="icon pe-7s-next-2"></span>
                <span>Create Blogs</span>
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/works" className="nav-align">
              <a>
                <span className="icon pe-7s-browser"></span>
                <span>Works</span>
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/clients" className="nav-align">
              <a>
                <span className="icon pe-7s-portfolio"></span>
                <span>Add Clients</span>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/admin/create-template" className="nav-align">
              <a>
                <span className="icon pe-7s-browser"></span>
                <span>Create Template</span>
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/works" className="nav-align">
              <a>
                <span className="icon pe-7s-browser"></span>
                <span>Add Works</span>
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/works" className="nav-align">
              <a>
                <span className="icon pe-7s-browser"></span>
                <span>Add Works</span>
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/works" className="nav-align">
              <a>
                <span className="icon pe-7s-browser"></span>
                <span>Add Works</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavbar;
