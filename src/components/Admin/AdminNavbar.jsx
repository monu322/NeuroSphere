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
          <NavItem to="" icon="home" label="Home" />
          <NavItem to="blog" icon="rss" label="Create Blogs" />
          <NavItem to="works" icon="briefcase" label="Works" />
          <NavItem to="clients" icon="users" label="Add Clients" />
          <NavItem to="templates" icon="copy" label="Templates" />
          <NavItem to="clients/prospect" icon="users" label="Clients" />
        </ul>
      </div>
    </div>
  );
};

export default AdminNavbar;

const NavItem = ({ to, icon, label }) => {
  return (
    <li className="nav-item ">
      <Link href={`/admin/${to}`} className="nav-align">
        <a>
          <i className={`fas fa-${icon} mr-2`}></i>
          <span>{label}</span>
        </a>
      </Link>
    </li>
  );
};
