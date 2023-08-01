import { doc, updateDoc } from "firebase/firestore";
import { transporter } from "../../components/config/nodemailer";
import db from "../../config/fire-config";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { recipient, subject } = req.body.values;
    const { body } = req.body;
    console.log(recipient);
    console.log(req.body.values);
    if (!recipient || !subject || !body) {
      return res.status(400).json({ message: "Bad request" });
    }
    try {
      const info = await transporter.sendMail({
        to: recipient,
        subject: subject,
        text: body,
        html: `<div>${body}</div><p></p>`,
      });
      console.log(info);
      return res.status(200).json({ message: "Mail send successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  }
};

export default handler;
