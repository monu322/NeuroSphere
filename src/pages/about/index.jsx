import { useEffect } from "react";
import MainLayout from "../../layouts/main";

import Header from "../../components/About/Header";
import Intro from "../../components/About/Intro";
import Minimal from "../../components/About/Minimal";
import Services from "../../components/About/Services";
import Testimonials from "../../components/About/Testimonials";
import Skills from "../../components/About/Skills";
import Team from "../../components/About/Team";
import Clients from "../../components/About/Clients";
import CallAction from "../../components/About/CallAction";

const Index = () => {
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  return (
    <MainLayout footerClass="bg-gray">
      <Header />
      <Intro />
      <Services />
      <Testimonials />
      <Skills />
      <Team />
      <Minimal />
      {/* <Clients /> */}
      <CallAction />
    </MainLayout>
  );
};

export default Index;
