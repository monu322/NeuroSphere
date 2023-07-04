import { useContext, useEffect } from "react";
import AdminLayout from "../../../layouts/admin";

import WorkForm from "../../../components/Admin/Work/WorkForm";
import { useRouter } from "next/router";
import { AuthContext } from "../../../context/AuthProvider";
import Signin from "../../../components/Auth/Signin";
import MainLayout from "../../../layouts/main";

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
      <WorkForm />
    </AdminLayout>
  );
};

export default Index;
