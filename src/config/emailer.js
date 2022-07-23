const express=require('express');
const { application } = require('express');
const{createTransport}=require('nodemailer');
const app=express();
const User=require('../models/user');
const mensaje=`<p>You have successfully registered</p>`;
const T_EMAIL="misael.tromp44@ethereal.email";
const T_PASS="ynWGQBssWp5BvySgCj";

    const transporter = createTransport({
        host: 'smtp.ethereal.email',//
        port: 587,
        auth: {
            user: T_EMAIL,
            pass: T_PASS,
        }
    });


const mailOptions={
    from:"Server NodeJS",
    to:T_EMAIL,
    subject:"E-commerce register",
    html:mensaje,
    
};


    app.post("/email-ecomerce",async (req,res)=>{
        try {
            let trans=await transporter.sendMail(mailOptions);
            console.log(trans);
            res.send("Sended Email to " +T_EMAIL);
        } catch (error) {
            
        }
    });
