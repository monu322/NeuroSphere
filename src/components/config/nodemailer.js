import nodemailer from "nodemailer";

const dotenv = require('dotenv');
dotenv.config()

const email = 'ardhra@neurosphere.tech'
const password= 'yozhzteooojlootq'

export const transporter = nodemailer.createTransport({
    service:"gmail",
    port:465,
    host:"smtp.gmail.com",
    auth:{
        user:email,
        pass:password
    },
    secure:true,
});

export const mailOptions = {
    from:email,
    to:email,
}