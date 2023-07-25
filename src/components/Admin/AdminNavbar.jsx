import Link from "next/link";
import React from "react";
import { NavLink } from "reactstrap";

const AdminNavbar = () => {
  return (
    <div className="admin-nav ">
      <div className="admin flex flex-col justify-evenly pl-5 pt-3 sticky-top">
        <div className="logo mb-4">
          <img src="/assets/img/neurosphere-logo.svg" alt="Neurosphere Logo" />
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
            <Link href="/admin/openings" className="nav-align">
              <a>
                <span className="icon pe-7s-portfolio"></span>
                <span>Add Openings</span>
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
