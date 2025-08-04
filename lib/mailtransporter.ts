const nodemailer = require("nodemailer");

import '@/envConfig.ts' 

const password = process.env.PURELYMAIL_PASSWORD

// Create a test account or replace with real credentials.
export const transporter = nodemailer.createTransport({
  host: "smtp.purelymail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "volosystem@purelymail.com",
    pass: password,
  },
});