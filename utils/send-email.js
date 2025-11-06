
const {Resend} = require("resend");
require("dotenv").config()
const API_KEY =process.env.RESEND_API_KEY
if (!API_KEY) throw new Error("Resend api key is missing in .env fuile ");

const resend = new Resend(API_KEY);

async function sendMail(to, subject, html) {
  const msgOption = {
    from : "onboarding@resend.dev",
    to,
    subject,
    html,
  };

  try {
     await resend.emails.send(msgOption);
    console.log("✅ Email sent successfully!");
    
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {sendMail}
