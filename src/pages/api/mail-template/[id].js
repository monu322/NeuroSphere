import { collection, doc, getDoc } from "firebase/firestore";
import db from "../../../config/fire-config";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const templateRef = doc(db, "templates", id);
      const docSnap = await getDoc(templateRef);
      const data = docSnap.data();
      return res.status(200).json({ data: data });
    } catch (error) {
      console.error("Error getting template", error);
      return res.status(500).json({ error: error });
    }
  }
};
export default handler;
