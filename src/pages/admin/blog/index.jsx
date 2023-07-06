import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import AdminLayout from "../../../layouts/admin";
import { useRouter } from "next/router";
import Signin from "../../../components/Auth/Signin";
import MainLayout from "../../../layouts/main";

import BlogForm from "../../../components/Admin/Blog/BlogForm";

const Index = () => {
  const authInfo = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);
  // if (authInfo.user === "user")
  //   return (
  //     <MainLayout footerClass="bg-gray">
  //       <Signin />
  //     </MainLayout>
  //   );
  return (
    <AdminLayout>
      <BlogForm />
      {/* <WorkForm /> */}
    </AdminLayout>
  );
};

export default Index;
