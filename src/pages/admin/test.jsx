import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import AdminLayout from "../../layouts/admin";
import { AuthContext } from "../../context/AuthProvider";
import ListTemplates from "../../components/Admin/ListTemplates";
import TestComponent from "../../components/Admin/TestComponent";

const Index = () => {
  const { roleInfo } = useContext(AuthContext);
  console.log(roleInfo);
  const router = useRouter();

  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
    if (roleInfo === "user") router.push("/");
  }, [roleInfo]);
  if (roleInfo === "") return null;

  return (
    <AdminLayout>
      <TestComponent />
    </AdminLayout>
  );
};

export default Index;
