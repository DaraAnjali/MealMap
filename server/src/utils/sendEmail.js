import { Resend } from "resend";

export const sendEmail = async ({ to, subject, html }) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY missing");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const data = await resend.emails.send({
    from: "MealMap <onboarding@resend.dev>",
    to,
    subject,
    html,
  });

  return data;
};
