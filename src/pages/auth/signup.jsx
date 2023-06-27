import React, { useEffect } from "react";
import MainLayout from "../../layouts/main";
import Signup from "../../components/Auth/Signup";

const Index = () => {
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);
  return (
    <MainLayout footerClass="bg-gray">
      <Signup />
    </MainLayout>
  );
};

export default Index;
