import React, { useContext, useEffect } from "react";
import MainLayout from "../../layouts/main";
import Signup from "../../components/Auth/Signup";
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
  return (
    <MainLayout footerClass="bg-gray">
      <Signup />
    </MainLayout>
  );
};

export default Index;
