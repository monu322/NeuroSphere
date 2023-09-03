import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { useRouter } from "next/router";
import AdminLayout from "../../../layouts/admin";
import UpdateMailTemplate from "../../../components/UpdateMailTemplate";

const Index = () => {
  const { roleInfo } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
    if (roleInfo === "user") router.push("/");
  }, []);
  if (roleInfo === "") return null;

  return (
    <AdminLayout>
      <UpdateMailTemplate id={id} />
    </AdminLayout>
  );
};

export default Index;
