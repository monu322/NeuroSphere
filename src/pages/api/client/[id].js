import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import db from "../../../config/fire-config";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const {
      name,
      location,
      description,
      positives,
      negatives,
      referenceProjects,
      contactName,
      contactDesignation,
      contactMail,
      secondaryMail,
      status,
    } = req.body.values;

    try {
      const clientCollection = collection(db, "client");
      const result = await addDoc(clientCollection, {
        name,
        location,
        description,
        positives,
        negatives,
        referenceProjects,
        contactName,
        contactDesignation,
        contactMail,
        secondaryMail,
        status,
      });
      const docRef = doc(db, "client", result.id);
      await updateDoc(docRef, {
        id: result.id,
      });
      return res.status(201).json({ message: "Client added successfully" });
    } catch (error) {
      console.error("Error adding client ", error);
      return res.status(500).json({ error: "Failed to add client" });
    }
  }

  if (req.method == "GET") {
    const { id } = req.query;
    try {
      const docRef = doc(db, "client", id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      return res.status(200).json({ data: data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
};

export default handler;
