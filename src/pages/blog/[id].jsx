import { useEffect } from "react";
import BlogLayout from "../../layouts/blog";

import Details from "../../components/Blog/Blog-Details/Details";
import blogs from "../../data/blogs";
import Header from "../../components/Blog/Blog-Details/Header";

const Index = ({ blog }) => {
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  return (
    <BlogLayout footerClass="bg-gray">
      {/* <Header /> */}
      <Details blog={blog} />
    </BlogLayout>
  );
};

export default Index;

export async function getServerSideProps(context) {
  console.log(context.params);
  const { id } = context.params;
  const blog = blogs.find((blog) => blog.id === id);
  return {
    props: {
      blog,
    },
  };
}
