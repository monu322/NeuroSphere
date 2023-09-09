import { useEffect } from "react";
import BlogLayout from "../../../layouts/blog";

import Header from "../../../components/Blog/Header";
import Blog from "../../../components/Blog/Blog";

const Index = () => {
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  return (
    <BlogLayout footerClass="bg-gray">
      <Header />
      page/1
    </BlogLayout>
  )
}

export default Index