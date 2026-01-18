import Event from "../models/Event.model.js";

export default async function cleanupEvents() {
  const now = new Date();

  const events = await Event.find({
    endsAt: { $exists: true }
  });

  for (const event of events) {
    // ONE-TIME
    if (event.recurrence === "one-time" && event.endsAt <= now) {
      event.completed = true;
      await event.save();
    }

    // DAILY
    if (event.recurrence === "daily" && event.endsAt <= now) {
      const diffMs = now - event.endsAt;
      const diffDays = Math.max(1, Math.ceil(diffMs / 86400000));

      event.date = new Date(event.date.getTime() + diffDays * 86400000);
      event.endsAt = new Date(event.endsAt.getTime() + diffDays * 86400000);
      await event.save();
    }

    // WEEKLY
    if (event.recurrence === "weekly" && event.endsAt <= now) {
      event.date = new Date(event.date.getTime() + 7 * 86400000);
      event.endsAt = new Date(event.endsAt.getTime() + 7 * 86400000);
      await event.save();
    }
  }
}
