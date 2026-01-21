import dotenv from "dotenv";

dotenv.config({
  path: new URL("../.env", import.meta.url),
});

if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.error("❌ SMTP ENV NOT LOADED (Brevo)");
} else {
  console.log("✅ Brevo SMTP loaded");
}
