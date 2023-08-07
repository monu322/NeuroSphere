import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../../layouts/admin";
import { AuthContext } from "../../../context/AuthProvider";
import MailTemplate from "../../../components/MailTemplate";

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
      <MailTemplate />
    </AdminLayout>
  );
};

export default Index;
