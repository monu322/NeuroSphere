import nodemailer from "nodemailer";

const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.email, process.env.password)

export const transporter = nodemailer.createTransport({
    service:"gmail",
    port:465,
    host:"smtp.gmail.com",
    auth:{
        user:process.env.email,
        pass:process.env.password
    },
    secure:true,
});

export const mailOptions = {
    from:process.env.email,
    to:process.env.email,
}