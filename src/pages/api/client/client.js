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
      template,
      referenceProjects,
      contactName,
      contactDesignation,
      contactMail,
      secondaryMail,
      recentAchievements,
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
        template,
        recentAchievements,
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
    try {
      const clientCollection = collection(db, "client");
      const querySnapshot = await getDocs(clientCollection);
      const data = querySnapshot.docs.map((doc) => doc.data());
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  if (req.method === "PATCH") {
    try {
      const { id } = req.body;
      const ref = doc(db, "client", id);
      await updateDoc(ref, {
        status: {
          firstMail: true,
        },
      });
      return res.status(200).json({ message: "Status Changed" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};

export default handler;
