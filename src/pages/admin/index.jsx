import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import AdminLayout from "../../layouts/admin";
import { AuthContext } from "../../context/AuthProvider";
import Home from "../../components/Admin/Home";

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
      <Home />
    </AdminLayout>
  );
};

export default Index;
