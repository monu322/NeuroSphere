import { useEffect } from "react";
import MainLayout from "../../layouts/main";

import Header from "../../components/Home2/Header";
import Intro from "../../components/Home2/Intro";
import Services from "../../components/Home2/Services";
import Works from "../../components/Home2/Works";
import Team from "../../components/Home2/Team";
import Video from "../../components/Home2/Video";
import Clients from "../../components/Home2/Clients";
import Blogs from "../../components/Home2/Blogs";

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
      <Works />
      <Team />
      <Video />
      <Clients />
      <Blogs />
    </MainLayout>
  )
}

export default Index