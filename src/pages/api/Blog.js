import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import db, { storage } from "../../config/fire-config";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { image, postContent } = req.body;
    const { title, postDescriptions, tags, posterName, postMeta } =
      req.body.values;

    try {
      const Tags = tags.split(",");
      const blogCollection = collection(db, "blogs");
      const result = await addDoc(blogCollection, {
        title,
        postDescriptions,
        postContent,
        tags: Tags,
        img: image,
        posterName,
        // posterAvatar,
        postMeta,
        postedDate: serverTimestamp(),
      });
      const docRef = doc(db, "blogs", result.id);
      await updateDoc(docRef, {
        id: result.id,
      });
      return res.status(201).json({ message: "Blog Created Successfully" });
    } catch (error) {
      console.error("Error creating blog:", error);
      return res.status(500).json({ error: "Failed to create blog" });
    }
  }
  if (req.method === "PATCH") {
    const { image, postContent, blogId } = req.body;
    const { title, postDescriptions, tags, posterName, postMeta } =
      req.body.values;

    try {
      const Tags = tags.split(",");
      const ref = doc(db, "blogs", blogId);
      await updateDoc(ref, {
        title,
        postDescriptions,
        postContent,
        tags: Tags,
        img: image,
        posterName,
        // posterAvatar,
        postMeta,
        postedDate: serverTimestamp(),
      });
      return res.status(201).json({ message: "Blog Updated Successfully" });
    } catch (error) {
      console.error("Error creating blog:", error);
      return res.status(500).json({ error: "Failed to update blog" });
    }
  }
};

export default handler;
