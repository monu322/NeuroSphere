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
<<<<<<< HEAD
    <CareersLayout>
=======
    <CareersLayout footerClass="bg-gray">
      <Header />
>>>>>>> b5424361617c5672cb1dd777e8eed106897e3549
      <CareerDetails />
    </CareersLayout>
  );
};

export default Index;
