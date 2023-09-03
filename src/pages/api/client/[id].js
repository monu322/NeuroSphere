import {
  addDoc,
  collection,
  deleteDoc,
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
  if (req.method === "PATCH") {
    const { id } = req.query;
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
      const docRef = doc(db, "client", id);
      await updateDoc(docRef, {
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
      return res.status(201).json({ message: "Client updated successfully" });
    } catch (error) {
      console.log("Error updating client ", error);
      return res.status(500).json({ error: "Failed to update client" });
    }
  }
  if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      await deleteDoc(doc(db, "client", id));
      res.status(200).json({ message: "Client deleted successfully" });
    } catch (error) {
      console.log("Error deleting client ", error);
      res.status(500).json({ error: "Failed to delete client" });
    }
  }
};

export default handler;
