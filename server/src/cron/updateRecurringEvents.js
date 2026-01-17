import cron from "node-cron";
import Event from "../models/Event.model.js";

cron.schedule("*/5 * * * *", async () => {
  try {
    const now = new Date();

    const events = await Event.find({
      recurrence: { $in: ["daily", "weekly"] },
      endsAt: { $lt: now }
    });

    for (const event of events) {
      if (event.recurrence === "daily") {
        event.date.setDate(event.date.getDate() + 1);
        event.endsAt.setDate(event.endsAt.getDate() + 1);
      }

      if (event.recurrence === "weekly" && event.weeklyDay !== null) {
        const today = new Date();
        const diff =
          (event.weeklyDay + 7 - today.getDay()) % 7 || 7;

        event.date.setDate(today.getDate() + diff);
        event.endsAt.setDate(today.getDate() + diff);
      }

      await event.save();
    }

    console.log(`[CRON] Updated ${events.length} recurring events`);
  } catch (err) {
    console.error("[CRON ERROR]", err.message);
  }
});
