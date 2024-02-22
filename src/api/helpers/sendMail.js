"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();
module.exports.sendOtpToMail = async ({ email, listTask }) => {
    
  const transporter =  nodemailer.createTransport({
    service: "gmail",
    port:465,
    secure: false,
    auth: {
      user: process.env.ACCOUNT_GOOGLE, // generated ethereal user
      pass: process.env.PASSWORD_2FA, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: process.env.ACCOUNT_GOOGLE, // sender address
    to: email, // list of receivers
    subject: "Send Otp confirm your info", // Subject line
    text:
      "list of task:" + listTask
  });
  return 1;
};


