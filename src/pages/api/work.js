import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import db from "../../config/fire-config";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { imageURL, wideImageURL ,serviceImgUrl,testimonialImgUrl,outcomeImgUrl,} = req.body;
    const {
      // type,
      title,
      description,
      tags,
      link,
      objective,
      servicesIntro,
      services,
      outcomeText,
      outcomes,
      testimonialContent,
      testimonialDetails,
      testimonialName,
      published
    } = req.body.values;
    try {
      const Tags = tags.split(",");
      const workCollection = collection(db, "works");
      const result = await addDoc(workCollection, {
        // type,
        title,
        description,
        tags: Tags,
        link,
        objective,
        servicesIntro,
        services,
        outcomeText,
        outcomes,
        img: imageURL,
        wideImg: wideImageURL,
        testimonialImg: testimonialImgUrl,
        serviceImg: serviceImgUrl,
        outcomeImg: outcomeImgUrl,
        testimonialContent,
        testimonialDetails,
        testimonialName,
        published,
        date: serverTimestamp(),
      });
      const docRef = doc(db, "works", result.id);
      await updateDoc(docRef, {
        id: result.id,
      });
      return res.status(201).json({ message: "Works added successfully" });
    } catch (error) {
      console.log("Error adding work:", error);
      res.status(500).json({ error: "Failed to add work" });
    }
  }

    if (req.method === "PATCH") {

       const {link , title , description , tags , 
        objective , servicesIntro ,services ,
         outcomeText ,outcomes , testimonialName ,
          testimonialContent , testimonialDetails, published} = req.body.values;
          const {imgUrl , testimonialImgUrl, wideImageURL, serviceImgUrl, outcomeImgUrl} = req.body;


    console.log('Data from server : ' + JSON.stringify(req.body.values));
    try {
      const {workId} = req.body;;
      console.log("WorkId : "+workId);
      // const Tags = tags.split(",");
      const ref = doc(db, "works", workId);
      await updateDoc(ref, {
        img:imgUrl,
        wideImg:wideImageURL , serviceImg:serviceImgUrl , outcomeImg:outcomeImgUrl , testimonialImg:testimonialImgUrl,
        link , title , description , tags , 
        objective , servicesIntro , services ,
         outcomeText , outcomes , testimonialName ,
          testimonialContent , testimonialDetails , published
      });
      res.status(201).json({ message: "work updated successfully" });
    } catch (error) {
      console.error("Error creating work:", error);
      return res.status(500).json({ error: "Failed to update work" });
    }
  }

  if (req.method === "GET") {
    try {
      const workCollection = collection(db, "works");
      const q = query(workCollection, orderBy("title"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
    
  if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ error: "Document ID not provided." });
      }

      await deleteDoc(doc(db, "works", id));

      return res.status(200).json({ message: "Document deleted successfully." });
    } catch (error) {
      console.error("Error while deleting the document:", error);
      return res.status(500).json({ error: "An error occurred while deleting the document." });
    }
  }
}



export default handler;
