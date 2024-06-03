/* eslint-disable @next/next/no-css-tags */
// import { useEffect, useRef } from "react";
// import Navbar from "../components/Navbar/Navbar";
// import Footer from "../components/Footer/Footer";
// import Head from "next/head";

// const MainLayout = ({ children, footerClass }) => {
//   const navbarRef = useRef(null);
//   const logoRef = useRef(null);

//   useEffect(() => {
//     var navbar = navbarRef.current;

//     if (window.pageYOffset > 300) navbar.classList.add("nav-scroll");
//     else navbar.classList.remove("nav-scroll");

//     window.addEventListener("scroll", () => {
//       if (window.pageYOffset > 300) navbar.classList.add("nav-scroll");
//       else navbar.classList.remove("nav-scroll");
//     });
//   }, [navbarRef]);

//   return (
//     <>
//       <Head>
//         <link rel="stylesheet" href="/assets/css/style.css" />
//         <link rel="stylesheet" href="/assets/css/style2.css" />
//         <link rel="stylesheet" href="/assets/css/base.css" />
//         <link rel="stylesheet" href="/assets/css/responsive.css" />
//       </Head>

//       <Navbar navbarRef={navbarRef} logoRef={logoRef} />
//       { children }
//       <Footer classText={footerClass} />
//     </>
//   );
// };

// export default MainLayout;

import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Head from "next/head";
import { useRouter } from "next/router";

const MainLayout = ({ children, footerClass }) => {
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    var navbar = navbarRef?.current;

    if (window.pageYOffset > 300) navbar?.classList?.add("nav-scroll");
    else navbar?.classList?.remove("nav-scroll");

    window?.addEventListener("scroll", () => {
      if (window?.pageYOffset > 300) navbar?.classList?.add("nav-scroll");
      else navbar?.classList?.remove("nav-scroll");
    });
  }, [navbarRef]);

  // Determine whether to display the Navbar component based on the path
  const displayNavbar = !router.pathname.startsWith("/book");

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/style2.css" />
        <link rel="stylesheet" href="/assets/css/base.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
      </Head>

      {displayNavbar && (
        <Navbar navbarRef={navbarRef} logoRef={logoRef} />
      )}
      {children}
      <Footer classText={footerClass} />
    </>
  );
};

export default MainLayout;

