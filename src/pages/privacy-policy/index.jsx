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
      <section className="intro section-padding">
      <div className="container">
        <h1>Privacy Policy</h1>
        <p>At NeuroSphere, we are committed to safeguarding the privacy of our clients and website visitors. This privacy policy outlines how we collect, use, and protect the information you provide when using our lead generation form.</p>
        <h2>Information Collection:</h2>
        <p>We collect personal information such as name, email address, phone number, and company name voluntarily provided by users filling out our lead generation form.</p>
        <h2>Use of Information:</h2>
        <p>The information collected is used solely for the purpose of understanding your project requirements, contacting you, and providing relevant services. We may also use your information to send promotional emails about our services, but you can opt-out of these communications at any time.</p>
        <h2>Data Security:</h2>
        <p>We take appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
        <h2>Data Sharing:</h2>
        <p>We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent, except for trusted third parties who assist us in conducting our business or servicing you.</p>
        <h2>Consent:</h2>
        <p>By submitting your information through our lead generation form, you consent to the collection, use, and disclosure of your information as described in this privacy policy.</p>
        <h2>Changes to Privacy Policy:</h2>
        <p>We reserve the right to update or modify this privacy policy at any time without prior notice. Any changes will be posted on this page.</p>
        <h2>Contact Us:</h2>
        <p>If you have any questions or concerns about our privacy policy, please contact us at operations@neurosphere.tech.</p>
      </div>
      </section>
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
