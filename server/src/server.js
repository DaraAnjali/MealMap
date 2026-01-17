import app from "./app.js";
import dotenv from "dotenv";
import cron from "node-cron";
import Event from "./models/Event.model.js";
import cleanupEvents from "./utils/cleanupEvents.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// ------------------ Cron job: Cleanup expired events ------------------
cron.schedule("* * * * *", async () => {
  try {
    await cleanupEvents();

    const now = new Date();
    const expiredEvents = await Event.find({
      endsAt: { $lte: now },
      recurrence: "one-time",
    });

    for (const event of expiredEvents) {
      await event.deleteOne();
    }

    if (expiredEvents.length > 0) {
      console.log(`🗑️ Deleted ${expiredEvents.length} one-time events`);
    }
  } catch (err) {
    console.error("❌ Event cleanup error:", err.message);
  }
});

// ------------------ Start server ------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
