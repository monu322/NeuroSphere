import { transporter, mailOptions } from "../../components/config/nodemailer";

const handler = async (req, res) =>{
    if(req.method ==="POST"){
        const data = req.body;
        if(!data.name || !data.email || !data.message){
            return res.status(400).json({message:"Bad request"})
        }

        try{
            await transporter.sendMail({
                ...mailOptions,
                subject: `Message From ${req.body.name}`,
                text:data.message + "| Sent from:" + data.email,
                html:`<div>${req.body.message}</div><p>Sent from: ${req.body.email}</p>`
            })
            return res.status(200).json({message:"message send successfully"})
        }catch (error){
            console.log(error)
            return res.status(400).json({message:"Bad request"})
        }
    }
    console.log(req.body)
    res.status(200).json({message:"message send successfully"})
};

export default handler;