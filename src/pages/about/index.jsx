import { useEffect } from "react";
import MainLayout from "../../layouts/main";

import Header from "../../components/About/Header";
import Intro from "../../components/About/Intro";
import Minimal from "../../components/About/Minimal";
import Services from "../../components/About/Services";
import Testimonials from "../../components/About/Testimonials";
import Skills from "../../components/About/Skills";
import Team from "../../components/About/Team";

import CallAction from "../../components/About/CallAction";
import HeaderData from "../../data/About/Header.json";
import IntroData from "../../data/About/Intro.json";
import ServicesData from "../../data/About/Services.json";
import TestimonialsData from "../../data/About/Testimonials.json";
import SkillsData from "../../data/About/Skills.json";
import TeamData from "../../data/About/Team.json";
import MinimalData from "../../data/About/Minimal.json";
import ClientsData from "../../data/About/Clients.json";

const Index = ({
  HeaderData,
  IntroData,
  ServicesData,
  TestimonialsData,
  SkillsData,
  TeamData,
  MinimalData,
  ClientsData,
}) => {
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  return (
    <MainLayout footerClass="bg-gray">
      <Header headerData={HeaderData} />
      <Intro introData={IntroData} />
      <Services servicesData={ServicesData} />
      <Testimonials testimonialsData={TestimonialsData} />
      {/* <Skills skillsData={SkillsData} /> */}
      <Team teamData={TeamData} />
      <Minimal minimalData={MinimalData} />
      {/* <Clients clientsData={ClientsData} /> */}
      <CallAction />
    </MainLayout>
  );
};

export default Index;

export async function getServerSideProps() {
  return {
    props: {
      HeaderData,
      IntroData,
      ServicesData,
      TestimonialsData,
      SkillsData,
      TeamData,
      MinimalData,
      ClientsData,
    },
  };
}
