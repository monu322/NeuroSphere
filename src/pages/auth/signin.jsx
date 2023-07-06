import React, { useContext, useEffect } from "react";
import Signin from "../../components/Auth/Signin";
import MainLayout from "../../layouts/main";
import { AuthContext } from "../../context/AuthProvider";

const Index = () => {
  const { isLoggedIn, roleAs } = useContext(AuthContext);
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
    if (isLoggedIn === true && roleAs === "user") router.push("/");
    if (isLoggedIn === true && roleAs === "admin") router.push("/admin");
  }, []);
  // if (authInfo.isLoggedIn === false && authInfo.roleAs === "user")
  //   return (
  //     <MainLayout footerClass="bg-gray">
  //       <Signin />
  //     </MainLayout>
  //   );
  return (
    <MainLayout footerClass="bg-gray">
      <Signin />
    </MainLayout>
  );
};
export default Index;
