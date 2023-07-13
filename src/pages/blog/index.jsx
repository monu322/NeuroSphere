import { useEffect } from "react";
import BlogLayout from "../../layouts/blog";

import Header from "../../components/Blog/Header";
import Blog from "../../components/Blog/Blog";
import blogs from "../../data/blogs";

const Index = ({ blogs }) => {
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  return (
    <BlogLayout footerClass="bg-gray">
      <Header />
      <Blog blogsData={blogs} />
    </BlogLayout>
  );
};

export default Index;

export async function getServerSideProps() {
  return {
    props: {
      blogs,
    },
  };
}
