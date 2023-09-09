import { useEffect } from "react";
import Works from "../../components/Works2";
import WorksLayout from "../../layouts/works";

const Index = () => {
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  return (
    <WorksLayout footerClass="bg-gray">
      <Works />
    </WorksLayout>
  )
}

export default Index