import dotenv from "dotenv";

dotenv.config({
  path: new URL("../.env", import.meta.url),
});

if (!process.env.RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY NOT LOADED");
} else {
  console.log("✅ RESEND_API_KEY loaded");
}
