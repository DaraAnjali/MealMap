import app from "./app.js";
import dotenv from "dotenv";
import cron from "node-cron";
import cleanupEvents from "./utils/cleanupEvents.js";
import path from "path";
import donationRequestRoutes from "./routes/donationRequest.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// ------------------ Cron job: auto update events ------------------
cron.schedule("* * * * *", async () => {
  try {
    await cleanupEvents();
    console.log("✔ Events auto-updated");
  } catch (err) {
    console.error("❌ Event cleanup error:", err.message);
  }
});
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/donation-requests", donationRequestRoutes);
// ------------------ Start server ------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
