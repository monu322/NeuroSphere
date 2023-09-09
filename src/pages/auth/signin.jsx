import React, { useEffect } from "react";
import Signin from "../../components/Auth/Signin";
import MainLayout from "../../layouts/main";

const Index = () => {
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  return (
    <MainLayout footerClass="bg-gray">
      <Signin />
    </MainLayout>
  );
};
export default Index;
