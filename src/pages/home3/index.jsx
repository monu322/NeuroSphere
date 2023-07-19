import { useEffect } from "react";
import MainLayout from "../../layouts/main";

import Header from "../../components/Home3/Header";
import Intro from "../../components/Home3/Intro";
import Services from "../../components/Home3/Services";
import IntroVers from "../../components/Home3/IntroVers";
import Works from "../../components/Home3/Works";
import Testimonials from "../../components/Home3/Testimonials";
import Pricing from "../../components/Home3/Pricing";
import Blogs from "../../components/Home3/Blogs";
import CallAction from "../../components/Home3/CallAction";

const Index = () => {
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("d3-dark");
    body.classList.remove("bg-gr");
  }, []);

  return (
    <MainLayout>
      <Header />
      <Intro />
      <Services />
      <IntroVers />
      <Works />
      <Testimonials />
      <Pricing />
      <Blogs />
      <CallAction />
    </MainLayout>
  );
};

export default Index;
