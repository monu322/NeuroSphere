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
import HeaderData from "../../data/Home1/Header.json";
import ServicesData from "../../data/Home1/Services.json";
import BlockData from "../../data/Home1/Block.json";
import WorksData from "../../data/Home3/Works.json";
import TestimonialsData from "../../data/Home1/Testimonials.json";
import TeamData from "../../data/About/Team.json";

const Index = (props) => {
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.remove("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  return (
    <MainLayout footerClass="bg-dark">
      <Header headerData={HeaderData} />
      <Services servicesData={ServicesData} />
      <Block blockData={BlockData} />
      <Works worksData={WorksData} />
      <Testimonials testimonialsData={TestimonialsData} />
      {/* <Clients /> */}
      {/* <Team teamData={TeamData} /> */}
      {/* <Blogs /> */}
    </MainLayout>
  );
};
export default Index;

export async function getServerSideProps() {
  return {
    props: {
      HeaderData,
      ServicesData,
      BlockData,
      WorksData,
      TestimonialsData,
      TeamData,
    },
  };
}
