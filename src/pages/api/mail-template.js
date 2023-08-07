import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import db from "../../config/fire-config";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { subject, body } = req.body.values;
    try {
      const templateRef = collection(db, "templates");
      const response = await addDoc(templateRef, {
        subject,
        body,
      });
      const docRef = doc(db, "templates", response.id);
      await updateDoc(docRef, {
        id: response.id,
      });
      return res.status(201).json({ message: "Template created successfully" });
    } catch (error) {
      console.error("Error creating template: " + error.message);
      return res.status(500).json({ error: "Failed to create template" });
    }
  }

  if (req.method === "GET") {
    try {
      const templateRef = collection(db, "templates");
      const querySnapshot = await getDocs(templateRef);
      const data = querySnapshot.docs.map((doc) => doc.data());
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  if (req.method === "PATCH") {
    const { subject, body, employees } = req.body.values;
    const { templateId } = req.body;
    try {
      const templateRef = doc(db, "templates", templateId);
      await updateDoc(templateRef, {
        subject,
        body,
      });
      return res.status(201).json({ message: "Template updated successfully" });
    } catch (error) {
      console.error("Error creating blog:", error);
      return res.status(500).json({ error: "Failed to update template" });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      await deleteDoc(doc(db, "templates", id));
      res.status(200).json({ message: "Templates deleted successfully" });
    } catch (error) {
      console.log("Error while deleting the template", error);
      res.status(500).json({ error });
    }
  }
};

export default handler;
