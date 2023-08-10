import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import AdminLayout from "../../../layouts/admin";
import { useRouter } from "next/router";
import UpdateClientForm from "../../../components/Admin/Client/UpdateClientForm";

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
      <UpdateClientForm id={id} />
    </AdminLayout>
  );
};

export default Index;
