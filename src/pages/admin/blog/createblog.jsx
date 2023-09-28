import { useContext, useEffect } from "react";
import AdminLayout from "../../../layouts/admin";
import { AuthContext } from "../../../context/AuthProvider";
import { useRouter } from "next/router";
import CreateBlog from "../../../components/Admin/Blog/CreateBlog";

const Index = () => {
  const { roleInfo } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
    if (roleInfo === "user") router.push("/");
  }, []);
  if (roleInfo === "") return null;

  return (
    <AdminLayout>
      <CreateBlog />
    </AdminLayout>
  );
};

export default Index;
