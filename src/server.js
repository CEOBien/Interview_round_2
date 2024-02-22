const express = require("express");
const bodyParser = require("body-parser");
const initWebRoutes = require("./api/routes/index.js");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const configCors = require("./config/cors");
const cron = require('node-cron');
const fs = require('fs');
const {sendOtpToMail} = require("../helpers/sendMail");
const app = express();
// use .env
require("dotenv").config();
//config cors
configCors(app);

// Middleware
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// config app
// app.use(bodyParser.json({ limit: '50mb', extended: true }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
cron.schedule('0 10 * * *',async function() {
  console.log('---------------------');
  console.log('Running Cron Job');
  const email = "daohai271@gmail.com";
  const filecsv = ["abc","acc"]
  await sendOtpToMail(email,filecsv)
});
// init routes
initWebRoutes(app);
//file retrieve

// declare PORT
let port = process.env.PORT || 5000;

// start server
app.listen(port, () => {
  //callback
  console.log("Service is runing on the port : " + port);
});
