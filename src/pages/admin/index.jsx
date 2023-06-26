import { useEffect } from "react";
import AdminLayout from "../../layouts/admin";
import BlogForm from "../../components/Admin/Blog/BlogForm";
import WorkForm from "../../components/Admin/Work/WorkForm";

const Index = () => {
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  return <AdminLayout footerClass="bg-gray">
    {/* <BlogForm /> */}
    <WorkForm/>
    </AdminLayout>;
};

export default Index;
