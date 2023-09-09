import { useEffect } from "react";
import CareersLayout from "../../../layouts/careers";
import Header from "../../../components/Careers/Openings-Details/Header";

const Index = () => {
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  return (
    <CareersLayout footerClass="bg-gray">
      <Header />
    </CareersLayout>
  );
};

export default Index;
