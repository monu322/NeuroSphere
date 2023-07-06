import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import AdminLayout from "../../layouts/admin";
import { AuthContext } from "../../context/AuthProvider";
import Home from "../../components/Admin/Home";
import MainLayout from "../../layouts/main";
import Signin from "../../components/Auth/Signin";

const Index = () => {
  const authInfo = useContext(AuthContext);

  const router = useRouter();
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
    if (authInfo.roleAs === "user") router.push("/");
  }, []);

  return (
    <AdminLayout>
      <Home />
    </AdminLayout>
  );
};

export default Index;
