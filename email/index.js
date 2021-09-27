const nodemailer = require("nodemailer");

const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.API_KEY
    }
  })
);

async function sendMessage(to, subject, message) {
  const from = "shop@parkinsonpowerfuldesign.com";
  await transporter.sendMail({
    to,
    from,
    subject,
    html: message
  });
}
exports.sendMessage = sendMessage;
