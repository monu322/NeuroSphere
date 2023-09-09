import { useEffect } from "react";
import CareersLayout from "../../../layouts/careers";
import Header from "../../../components/Careers/Openings-Details/Header";
import { useRouter } from "next/router";
import Details from "../../../components/Careers/Openings-Details/Details";
import JobOpenings from "../../../data/Careers/Openings.json";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;

  const jobDetails = JobOpenings.find((opening) => opening.id === Number(id));

  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  return (
    <CareersLayout footerClass="bg-gray">
      <Header data={jobDetails} />
      <Details data={jobDetails} />
    </CareersLayout>
  );
};

export default Index;
