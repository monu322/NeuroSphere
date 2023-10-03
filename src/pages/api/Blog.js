import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import db from "../../config/fire-config";

const handler = async (req, res) => {
  // if (req.method === "POST") {
  //   const { image, postContent, isPublished } = req.body;
  //   const { title, postDescriptions, tags, posterName, postMeta } =
  //     req.body.values;

  //   try {
  //     const Tags = tags.split(",");
  //     const blogCollection = collection(db, "blogs");
  //     const result = await addDoc(blogCollection, {
  //       title,
  //       postDescriptions,
  //       postContent,
  //       tags: Tags,
  //       img: image,
  //       posterName,
  //       // posterAvatar,
  //       isPublished,
  //       postMeta,
  //       postedDate: serverTimestamp(),
  //     });
  //     const docRef = doc(db, "blogs", result.id);
  //     await updateDoc(docRef, {
  //       id: result.id,
  //     });
  //     return res.status(201).json({ message: "Blog created successfully" });
  //   } catch (error) {
  //     console.error("Error creating blog:", error);
  //     return res.status(500).json({ error: "Failed to create blog" });
  //   }
  // }

  if (req.method === "POST") {
    const { data, isPublished, image } = req.body;
    const { title, postDescriptions, tags, posterName } = req.body.values;

    try {
      const Tags = tags.split(",");
      const blogCollection = collection(db, "blogs");
      const result = await addDoc(blogCollection, {
        title,
        img: image,
        postDescriptions,
        data,
        tags: Tags,
        posterName,
        // posterAvatar,
        isPublished,
        postedDate: serverTimestamp(),
      });
      const docRef = doc(db, "blogs", result.id);
      await updateDoc(docRef, {
        id: result.id,
      });
      return res.status(201).json({ message: "Blog created successfully" });
    } catch (error) {
      console.error("Error creating blog:", error);
      return res.status(500).json({ error: "Failed to create blog" });
    }
  }

  if (req.method === "PATCH") {
    const { image, data, blogId, isPublished, unpublish } = req.body;
    const { title, postDescriptions, tags, posterName, postMeta } =
      req.body.values;
    console.log("From the backend" + isPublished);
    try {
      const Tags = tags.split(",");
      const ref = doc(db, "blogs", blogId);
      if (unpublish) {
        await updateDoc(ref, {
          title,
          img: image,
          postDescriptions,
          data,
          tags: Tags,
          posterName,
          isPublished: false,
          postMeta,
        });
        return res
          .status(201)
          .json({ message: "Unpublished the Blog successfully" });
      }
      await updateDoc(ref, {
        title,
        img: image,
        postDescriptions,
        data,
        tags: Tags,
        posterName,
        isPublished,
        // posterAvatar,
        postMeta,
      });
      if (image) {
        await updateDoc(ref, {
          img: image,
        });
      }
      return res.status(201).json({ message: "Blog updated successfully" });
    } catch (error) {
      console.error("Error creating blog:", error);
      return res.status(500).json({ error: "Failed to update blog" });
    }
  }
  if (req.method === "GET") {
    try {
      const blogCollection = collection(db, "blogs");
      const q = query(blogCollection, orderBy("postedDate", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      await deleteDoc(doc(db, "blogs", id));
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error" });
    }
  }
};

export default handler;
