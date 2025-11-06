const sgMail = require("@sendgrid/mail");
const API_KEY = process.env.SENDGRID_API_KEY;
if(API_KEY) {
  console.log("API_KEY_SENDGRID IS MISSING>>F")
}

sgMail.setApiKey(API_KEY);

async function sendEmail(to, from, subject, html) {
  const msg = {
    to,
    from,
    subject,
    html,
  };

  try {
    const response = await sgMail.send(msg);
    console.log("✅ Email sent successfully!");
    return response;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { sendEmail };
