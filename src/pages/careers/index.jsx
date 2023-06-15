import { useEffect } from "react";
import CareersLayout from "../../layouts/careers";
import CareerDetails from "../../components/Careers/CareerDetails";
import Header from "../../components/Careers/Header";

const Index = () => {
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  return (
    <CareersLayout>
      <Header />
      <CareerDetails />
    </CareersLayout>
  );
};

export default Index;
