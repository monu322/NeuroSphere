import { useEffect } from "react";
import BlogLayout from "../../layouts/blog";

import Details from "../../components/Blog/Blog-Details/Details";
// import blogs from "../../data/blogs";
import Header from "../../components/Blog/Blog-Details/Header";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import db from "../../config/fire-config";

const Index = ({ blog, currentIndex, totalBlogs, blogs }) => {
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  return (
    <BlogLayout footerClass="bg-gray">
      {/* <Header /> */}
      <Details
        blog={blog}
        blogs={blogs}
        currentIndex={currentIndex > totalBlogs ? 0 : currentIndex}
        totalBlogs={totalBlogs}
      />
    </BlogLayout>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const val = context.params.id.split("-");
  const totalBlogs = Number(val[val.length - 2]);
  const currentIndex = Number(val[val.length - 3]);
  const blogCollection = collection(db, "blogs");
  const q = query(blogCollection, orderBy("postedDate", "desc"));
  const querySnapshot = await getDocs(q);
  const allBlogs = [];
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    const postedDate =
      docData.postedDate instanceof Timestamp
        ? docData.postedDate.toDate()
        : docData.postedDate;
    docData.postedDate = postedDate.getTime();
    allBlogs.push(docData);
  });

  const id = val[val.length - 1];
  const docRef = doc(db, "blogs", id);
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();
  const postedDate =
    docData.postedDate instanceof Timestamp
      ? docData.postedDate.toDate()
      : docData.postedDate;
  docData.postedDate = postedDate.getTime();
  return {
    props: {
      blog: docData,
      blogs: allBlogs,
      currentIndex,
      totalBlogs,
    },
  };
}
