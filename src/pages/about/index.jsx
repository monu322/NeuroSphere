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

import HeaderData from "../../data/About/Header.json";
import IntroData from "../../data/About/Intro.json";
import ServicesData from "../../data/About/Services.json";
import TestimonialsData from "../../data/About/Testimonials.json";
import SkillsData from "../../data/About/Skills.json";
import TeamData from "../../data/About/Team.json";
import MinimalData from "../../data/About/Minimal.json";
import ClientsData from "../../data/About/Clients.json";

export async function getStaticProps(context) {
  return {
    props: {
      HeaderData,
      IntroData,
      ServicesData,
      TestimonialsData,
      SkillsData,
      TeamData,
      MinimalData,
      // ClientsData
    },
  };
}

const Index = ({ HeaderData, IntroData }) => {
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  return (
    <MainLayout footerClass="bg-gray">
      <Header HeaderData={HeaderData} />
      <Intro IntroData={IntroData} />
      <Services ServicesData={ServicesData} />
      <Testimonials TestimonialsData={TestimonialsData} />
      <Skills SkillsData={SkillsData} />
      <Team TeamData={TeamData} />
      <Minimal MinimalData={MinimalData} />
      {/* <Clients ClientsData={ClientsData} /> */}
      <CallAction />
    </MainLayout>
  );
};

export default Index;
