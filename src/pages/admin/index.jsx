import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import AdminLayout from "../../layouts/admin";
import { AuthContext } from "../../context/AuthProvider";
import Home from "../../components/Admin/Home";

const Index = () => {
  const { roleInfo } = useContext(AuthContext);

  const router = useRouter();
  console.log(roleInfo);
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
    if (roleInfo === "user") router.push("/");
  }, [roleInfo]);

  return (
    <AdminLayout>
      <Home />
    </AdminLayout>
  );
};

export default Index;
