import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import AdminLayout from "../../../layouts/admin";
import { useRouter } from "next/router";
import UpdateBlogForm from "../../../components/Admin/Blog/UpdateBlog";

const Index = () => {
  const { roleInfo } = useContext(AuthContext);
  const router = useRouter();
  const { blogId } = router.query;
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
    if (roleInfo === "user") router.push("/");
  }, []);

  if (roleInfo === "") return null;
  return (
    <AdminLayout>
      <UpdateBlogForm id={blogId} />
    </AdminLayout>
  );
};

export default Index;
