import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY missing");
    }

    const response = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    console.log("📧 Resend response:", response);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response;
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw error;
  }
};
