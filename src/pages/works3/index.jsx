import { useEffect } from "react";
import WorksLayout from "../../layouts/works";

import Works from "../../components/Works3/Works";
import CallAction from "../../components/Works3/CallAction";

const Index = () => {
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  return (
    <WorksLayout footerClass="bg-gray">
      <Works />
      <CallAction />
    </WorksLayout>
  )
}

export default Index