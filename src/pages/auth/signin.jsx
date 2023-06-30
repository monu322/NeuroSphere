import React, { useContext, useEffect } from "react";
import Signin from "../../components/Auth/Signin";
import MainLayout from "../../layouts/main";
import { AuthContext } from "../../context/AuthProvider";

const Index = () => {
  const authInfo = useContext(AuthContext);
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);
  // if (authInfo.isLoggedIn === true)
  //   return (
  //     <MainLayout footerClass="bg-dark">
  //       <Header />
  //       <Services />
  //       <Block />
  //       <Works />
  //       <Testimonials />
  //       {/* <Clients /> */}
  //       <Team />
  //       {/* <Blogs /> */}
  //     </MainLayout>
  //   );
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("authInfo"));
    console.log(authInfo);
    authInfo.isLoggedIn = local.isLoggedIn;
    authInfo.user = local.user;
  });

  return (
    <MainLayout footerClass="bg-gray">
      <Signin />
    </MainLayout>
  );
};
export default Index;
