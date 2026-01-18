import app from "./app.js";   // ✅ VERY IMPORTANT
import dotenv from "dotenv";
import cron from "node-cron";
import cleanupEvents from "./utils/cleanupEvents.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// ------------------ Cron job ------------------
cron.schedule("* * * * *", async () => {
  try {
    await cleanupEvents();
    console.log("✔ Events auto-updated");
  } catch (err) {
    console.error("❌ Event cleanup error:", err.message);
  }
});

// ------------------ Start server ------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
