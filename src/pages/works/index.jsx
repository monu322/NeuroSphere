import { useEffect } from "react";
import Works from "../../components/Works1";
import WorksLayout from "../../layouts/works";
import WorksData from "../../data/Home3/Works.json";

export async function getStaticProps(context) {
  return {
    props: {
      WorksData,
    },
  };
}

const Index = ({ WorksData }) => {
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  return (
    <WorksLayout footerClass="bg-gray">
      <Works WorksData={WorksData} />
    </WorksLayout>
  );
};

export default Index;
