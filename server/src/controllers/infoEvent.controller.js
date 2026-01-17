import Event from "../models/Event.model.js";

export const createInfoEvent = async (req, res) => {
  try {
    if (!req.body.coordinates) {
      return res.status(400).json({ message: "Coordinates missing" });
    }

    const coordinates = JSON.parse(req.body.coordinates);

    const {
      title,
      locationName,
      address,
      date,
      startTime,
      endTime,
      recurrence = "one-time",   // ✅ SAFE FALLBACK ADDED
      weeklyDay,
      infoDisclaimer
    } = req.body;

    const endsAt = new Date(date);
    const [h, m] = endTime.split(":");
    endsAt.setHours(h, m, 0, 0);

    const event = await Event.create({
      title,
      locationName,
      address,
      coordinates,
      date,
      startTime,
      endTime,
      endsAt,
      recurrence: recurrence || "one-time",   // ✅ ENSURED DEFAULT
      weeklyDay: recurrence === "weekly" ? weeklyDay : null,
      organizer: req.user.id,
      createdByUserInfo: true,
      completed: false,
      infoDisclaimer
    });

    res.status(201).json(event);
  } catch (err) {
    console.error("INFO EVENT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
