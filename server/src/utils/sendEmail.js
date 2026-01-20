import { Resend } from "resend";

export const sendEmail = async ({ to, subject, html }) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY missing");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const data = await resend.emails.send({
      from: "MealMap <onboarding@resend.dev>", // trusted sender
      to,
      subject,
      html,
      reply_to: process.env.GMAIL_USER, // replies go to your Gmail
    });

    console.log("📨 Email sent via Resend:", data.id);
    return data;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};
