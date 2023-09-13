import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";
import AdminLayout from "../../layouts/admin";
import { useRouter } from "next/router";

import BlogsDraftList from "../../components/Admin/Blog/BlogsDraftList";

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
      <BlogsDraftList />
    </AdminLayout>
  );
};

export default Index;
