import Link from "next/link";
import React from "react";
import { Row, Col } from "reactstrap";
import { Nav, NavItem, NavLink } from "reactstrap";
// import IonIcon from "@ionic/react";
// import "@ionic/react/css/ionicons.css";

const AdminNavbar = () => {
  return (
    // <nav className="admin-navbar">
    // <nav className="w-25 border-right border-secondary min-vh-100 p-2">
    //   <div className="">
    //     {/* Logo  */}
    //     <Link href="/">
    //       <a className="logo">
    //         <img
    //           src="/assets/img/neurosphere-logo.svg"
    //           alt="logo"
    //           //   ref={logoRef}
    //         />
    //       </a>
    //     </Link>

    //     {/* <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarSupportedContent"
    //       aria-controls="navbarSupportedContent"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //       //   onClick={handleMobileDropdown}
    //     >
    //       <span className="icon-bar">
    //         <i className="fas fa-bars"></i>
    //       </span>
    //     </button> */}

    //     {/* navbar links */}

    //     <ul className="navbar-nav ml-auto mt-3">
    //       <Link href="/">
    //         <li className="nav-item">
    //           <span
    //             className="nav-link"
    //             data-toggle="dropdown"
    //             role="button"
    //             aria-haspopup="true"
    //             aria-expanded="false"
    //           >
    //             Home
    //           </span>
    //         </li>
    //       </Link>
    //       <li className="nav-item">
    //         <Link href="/about">
    //           <a className="nav-link">Create Blog</a>
    //         </Link>
    //       </li>
    //       <Link href="/works">
    //         <li className="nav-item">
    //           <span
    //             className="nav-link"
    //             data-toggle="dropdown"
    //             role="button"
    //             aria-haspopup="true"
    //             aria-expanded="false"
    //           >
    //             Add Work
    //           </span>
    //         </li>
    //       </Link>
    //       <li className="nav-item">
    //         <Link href="/blog">
    //           <a className="nav-link">Add Openings</a>
    //         </Link>
    //       </li>
    //       {/* <li className="nav-item">
    //           <Link href="/careers">
    //             <a className="nav-link">Careers</a>
    //           </Link>
    //         </li> */}
    //       <li className="nav-item">
    //         <Link href="/contact">
    //           <a className="nav-link">Contact</a>
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>

    // <Nav vertical>
    //   <NavItem>
    //     <NavLink href="#">Link</NavLink>
    //   </NavItem>
    //   <NavItem>
    //     <NavLink href="#">Link</NavLink>
    //   </NavItem>
    //   <NavItem>
    //     <NavLink href="#">Another Link</NavLink>
    //   </NavItem>
    //   <NavItem>
    //     <NavLink disabled href="#">
    //       Disabled Link
    //     </NavLink>
    //   </NavItem>
    // </Nav>

    // <div className="wrapper">
    //   <aside id="sidebar">
    //     <div className="h-100">
    //       <div className="sidebar-logo">
    //         <a href="#">Neurosphere</a>
    //       </div>
    //       <ul className="sidebar-nav">
    //         <li className="sidebar-header">Tools &amp; Settings</li>
    //         <li className="sidebar-item">
    //           <a href="#" className="sidebar-link">
    //             <ion-icon
    //               name="list-outline"
    //               className="pe-2 bg-red"
    //             ></ion-icon>
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   </aside>

    //   <div className="main">
    //     <nav className="navbar navbar-expand px-3 border-bottom">
    //       <button className="btn" type="button">
    //         <span className="navbar-toggler-icon"></span>
    //       </button>
    //     </nav>
    //   </div>
    // </div>

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
