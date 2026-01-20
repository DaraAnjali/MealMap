// server/src/utils/sendEmail.js
import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    console.log("📨 Preparing to send email...");
    console.log("Using Gmail:", process.env.GMAIL_USER);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // MUST be App Password
      },
    });

    // This checks if Gmail login actually works
    await transporter.verify();
    console.log("✅ Email transporter verified");

    const info = await transporter.sendMail({
      from: `"MealMap" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error; // very important so controller catches it
  }
};
