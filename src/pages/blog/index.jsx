import { useEffect } from "react";
import BlogLayout from "../../layouts/blog";

import Header from "../../components/Blog/Header";
import Blog from "../../components/Blog/Blog";
// import blogs from "../../data/blogs";
import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import db from "../../config/fire-config";

const Index = ({ data }) => {
  const blogs = data;
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  return (
    <BlogLayout footerClass="bg-gray">
      <Header />
      <Blog data={blogs} />
    </BlogLayout>
  );
};

export default Index;

const convertTimestampToDate = (timestamp) =>
  timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;

export async function getServerSideProps() {
  const blogCollection = collection(db, "blogs");
  const q = query(blogCollection, orderBy("postedDate", "desc"));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => {
    const docData = doc.data();
    docData.postedDate = convertTimestampToDate(docData.postedDate).getTime();
    return docData;
  });
  return {
    props: {
      data,
    },
  };
}
