import { useEffect } from "react";
import MainLayout from "../../layouts/main";

import Header from "../../components/Home1/Header";
import Services from "../../components/Home1/Services";
import Block from "../../components/Home1/Block";
import Works from "../../components/Home3/Works";
import Testimonials from "../../components/Home1/Testimonials";
// import Clients from "../../components/Home1/Clients";
import Team from "../../components/About/Team";
import Blogs from "../../components/Home1/Blog";

const Index = () => {
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.remove("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  return (
    <MainLayout footerClass="bg-dark">
      <Header />
      <Services />
      <Block />
      <Works />
      <Testimonials />
      {/* <Clients /> */}
      <Team />
      {/* <Blogs /> */}
    </MainLayout>
  )
}

export default Index