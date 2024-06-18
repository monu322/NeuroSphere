import { useEffect } from "react";
import MainLayout from "../../layouts/main";

import Header from "../../components/Book/Header";
import Intro from "../../components/Book/Intro";
import Testimonials from "../../components/Book/Testimonials";
import Services from "../../components/Book/Services";
import IntroVers from "../../components/Book/IntroVers";
import InfoSection from "../../components/Book/Info";
import CallAction from "../../components/Home3/CallAction";
import MeetingSection from "../../components/Book/Meeting";
import Works from "../../components/Book/Works";
import WorksData from "../../data/Book/Works.json";
import WorksSectionTwo from "../../components/Book/WorkSectionTwo/WorkSectionTwo";
import PricingTable from "../../components/Book/Pricing/PricingTable";

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
      <Works worksData={WorksData} />
      <Testimonials />
      <IntroVers />
      <InfoSection/>
      <Services />
      <MeetingSection/>
      <WorksSectionTwo/>
      <PricingTable/>
      <CallAction />
    </MainLayout>
  );
};

export default Index;
