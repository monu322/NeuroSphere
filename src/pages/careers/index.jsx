import { useEffect } from "react";
import CareersLayout from "../../layouts/careers";
import CareerDetails from "../../components/Careers/CareerDetails";

const Index = () => {
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  return (
    <CareersLayout footerClass="bg-gray">
      <CareerDetails />
    </CareersLayout>
  );
};

export default Index;
