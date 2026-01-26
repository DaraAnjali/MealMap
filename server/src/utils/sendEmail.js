import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,          // smtp-relay.brevo.com
  port: 587,
  secure: false,                        // MUST be false for port 587
  auth: {
    user: process.env.SMTP_USER,        // your Brevo login email
    pass: process.env.SMTP_PASS,        // your Brevo SMTP key (not password)
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"MealMap Support" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent successfully to:", to);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw error;
  }
};
