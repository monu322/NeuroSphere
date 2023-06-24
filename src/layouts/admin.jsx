/* eslint-disable @next/next/no-css-tags */
import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Head from "next/head";
<<<<<<< HEAD
=======
import AdminNavbar from "../components/Admin/AdminNavbar";
>>>>>>> 24d66272ca423245609b411dee2d11c0d55c5cbd

const AdminLayout = ({ children, footerClass }) => {
  const navbarRef = useRef(null);
  const logoRef = useRef(null);

<<<<<<< HEAD
  useEffect(() => {
    var navbar = navbarRef.current;

    if (window.pageYOffset > 300) navbar.classList.add("nav-scroll");
    else navbar.classList.remove("nav-scroll");

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) navbar.classList.add("nav-scroll");
      else navbar.classList.remove("nav-scroll");
    });
  }, [navbarRef]);
=======
  // useEffect(() => {
  //   var navbar = navbarRef.current;

  //   if (window.pageYOffset > 300) navbar.classList.add("nav-scroll");
  //   else navbar.classList.remove("nav-scroll");

  //   window.addEventListener("scroll", () => {
  //     if (window.pageYOffset > 300) navbar.classList.add("nav-scroll");
  //     else navbar.classList.remove("nav-scroll");
  //   });
  // }, [navbarRef]);
>>>>>>> 24d66272ca423245609b411dee2d11c0d55c5cbd

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/base.css" />
      </Head>

<<<<<<< HEAD
      <Navbar navbarRef={navbarRef} logoRef={logoRef} />

      <div className="main-content">
        {children}
        <Footer classText={footerClass} />
=======
      <div className="bg-white">
        <AdminNavbar />
        <div className="main-content w-75">{children}</div>
>>>>>>> 24d66272ca423245609b411dee2d11c0d55c5cbd
      </div>
    </>
  );
};

export default AdminLayout;
