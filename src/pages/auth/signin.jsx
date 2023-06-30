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
  if (authInfo.isLogged === false && authInfo.user === "user")
    return (
      <MainLayout footerClass="bg-gray">
        <Signin />
      </MainLayout>
    );
  return (
    <MainLayout footerClass="bg-gray">
      <Signin />
    </MainLayout>
  );
};
export default Index;
