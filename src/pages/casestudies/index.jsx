import { useEffect } from "react";
import Works from "../../components/Works1";
import WorksLayout from "../../layouts/works";
import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import db from "../../config/fire-config";

const Index = ({ data }) => {
  console.log(data);
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  return (
    <WorksLayout footerClass="bg-gray">
      <Works works={data} />
    </WorksLayout>
  );
};

export default Index;

const convertTimestampToDate = (timestamp) =>
  timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;

export async function getServerSideProps() {
  try {
    const workCollection = collection(db, "works");
    const q = query(workCollection, orderBy("date"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      docData.date = convertTimestampToDate(docData.date).getTime();
      return docData;
    });
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return {
    props: {
      data: [],
    },
  };
}
