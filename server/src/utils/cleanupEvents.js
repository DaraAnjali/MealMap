import Event from "../models/Event.model.js";


const cleanupEvents = async () => {
  try {
    const now = new Date();

    const events = await Event.find({
      recurrence: { $in: ["daily", "weekly"] },
      endsAt: { $lte: now }
    });

    for (const event of events) {
      const newDate = new Date(event.date);
      const newEndsAt = new Date(event.endsAt);

      if (event.recurrence === "daily") {
        newDate.setDate(newDate.getDate() + 1);
        newEndsAt.setDate(newEndsAt.getDate() + 1);
      }

      if (event.recurrence === "weekly") {
        newDate.setDate(newDate.getDate() + 7);
        newEndsAt.setDate(newEndsAt.getDate() + 7);
      }

      event.date = newDate;
      event.endsAt = newEndsAt;

      await event.save();
    }

    console.log(`✅ Updated ${events.length} recurring events`);
  } catch (err) {
    console.error("❌ Cleanup error:", err.message);
  }
};

export default cleanupEvents;
