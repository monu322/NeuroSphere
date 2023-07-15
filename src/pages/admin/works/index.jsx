import { useContext, useEffect } from "react";
import AdminLayout from "../../../layouts/admin";

import WorkForm from "../../../components/Admin/Work/WorkForm";
import { useRouter } from "next/router";
import { AuthContext } from "../../../context/AuthProvider";

const Index = () => {
  const { roleInfo } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
    if (roleInfo === "user") router.push("/");
  }, []);

  return (
    <AdminLayout>
      <WorkForm />
    </AdminLayout>
  );
};

export default Index;
