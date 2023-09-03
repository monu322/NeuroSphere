import { useContext, useEffect } from "react";
import AdminLayout from "../../../layouts/admin";
import UpdateWork from "../../../components/Admin/Work/UpdateWork";
import { useRouter } from "next/router";
import { AuthContext } from "../../../context/AuthProvider";

const Index = () => {
  const { roleInfo } = useContext(AuthContext);
  const router = useRouter();
  const { workId } = router.query;
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
    if (roleInfo === "user") router.push("/");
  }, []);

  return (
    <AdminLayout>
      <UpdateWork id={workId} />
    </AdminLayout>
  );
};

export default Index;
