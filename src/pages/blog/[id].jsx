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

const Index = ({ blog = "", currentIndex, totalBlogs, blogs }) => {
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

const convertTimestampToDate = (timestamp) =>
  timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;

export async function getServerSideProps({ params }) {
  const { id } = params;
  const [currentIndex, totalBlogs] = id.split("-").slice(-3, -1).map(Number);
  const [Id] = id.split("-").slice(-1);
  const blogCollection = collection(db, "blogs");
  const q = query(blogCollection, orderBy("postedDate", "desc"));
  const querySnapshot = await getDocs(q);
  const allBlogs = querySnapshot.docs.map((doc) => {
    const docData = doc.data();
    docData.postedDate = convertTimestampToDate(docData.postedDate).getTime();
    return docData;
  });

  const docRef = doc(db, "blogs", Id);
  const docSnap = await getDoc(docRef);
  const blog = docSnap.exists()
    ? {
        ...docSnap.data(),
        postedDate: convertTimestampToDate(docSnap.data().postedDate).getTime(),
      }
    : null;
  return {
    props: {
      blog,
      blogs: allBlogs,
      currentIndex,
      totalBlogs,
    },
  };
}
