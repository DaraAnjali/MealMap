// server/src/utils/sendEmail.js
import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // your Gmail
      pass: process.env.GMAIL_PASS  // App password recommended
    }
  });

  await transporter.sendMail({
    from: `"MealMap" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
    html
  });
};
