/* eslint-disable @next/next/no-css-tags */
import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Head from "next/head";
import AdminNavbar from "../components/Admin/AdminNavbar";
import Controls from "../components/Admin/Controls";

const AdminLayout = ({ children, footerClass }) => {
  const navbarRef = useRef(null);
  const logoRef = useRef(null);

  // useEffect(() => {
  //   var navbar = navbarRef.current;

  //   if (window.pageYOffset > 300) navbar.classList.add("nav-scroll");
  //   else navbar.classList.remove("nav-scroll");

  //   window.addEventListener("scroll", () => {
  //     if (window.pageYOffset > 300) navbar.classList.add("nav-scroll");
  //     else navbar.classList.remove("nav-scroll");
  //   });
  // }, [navbarRef]);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/base.css" />
      </Head>

      <div className="d-flex">
        <AdminNavbar />
        <div className="main-content w-100 bg-white">
          <Controls />
          {children}
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
