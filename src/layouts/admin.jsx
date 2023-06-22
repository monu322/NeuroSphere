/* eslint-disable @next/next/no-css-tags */
import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Head from "next/head";
import AdminNavbar from "../components/Admin/AdminNavbar";

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

      {/* <Navbar navbarRef={navbarRef} logoRef={logoRef} /> */}
      <div className="bg-white">
        <AdminNavbar />
        <div className="main-content w-75">
          {children}
          {/* <Footer classText={footerClass} /> */}
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
