/* eslint-disable @next/next/no-css-tags */
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Head from "next/head";
import Header from "../components/WorksHeader";

const WorksLayout = ({ children, footerClass }) => {
  const [marginTop, setMarginTop] = useState(0);
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) setMarginTop(headerRef.current.offsetHeight);

    var navbar = navbarRef.current;

    if (window.pageYOffset > 300) navbar.classList.add("nav-scroll");
    else navbar.classList.remove("nav-scroll");

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) navbar.classList.add("nav-scroll");
      else navbar.classList.remove("nav-scroll");
    });
  }, [navbarRef]);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/base.css" />
        <link rel="stylesheet" href="/assets/css/style2.css" />
      </Head>

      <Navbar navbarRef={navbarRef} logoRef={logoRef} />
      <Header headerRef={headerRef} />
      <div className="main-content" style={{ marginTop: marginTop || 0 + 'px' }}>
        { children }
        <Footer classText={footerClass} />
      </div>
    </>
  );
};

export default WorksLayout;
