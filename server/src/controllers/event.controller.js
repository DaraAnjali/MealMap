import Event from "../models/Event.model.js";

export const markCompletedEvents = async () => {
  const now = new Date();

  await Event.updateMany(
    {
      endsAt: { $lt: now },
      completed: false,
      recurrence: "one-time"
    },
    { completed: true }
  );
};

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      locationName,
      address,
      date,
      startTime,
      endTime,
      eventType,
      recurrence,
      weeklyDay,
      enableDonation,
      organizerContact
    } = req.body;

    const coordinates = JSON.parse(req.body.coordinates);
    const endsAt = new Date(date);
    const [h, m] = endTime.split(":");
    endsAt.setHours(h, m, 0, 0);

    const qrCode = req.file ? `/uploads/${req.file.filename}` : null;

    const event = await Event.create({
      title,
      locationName,
      address,
      coordinates,
      date,
      startTime,
      endTime,
      endsAt,
      eventType,
      recurrence,
      weeklyDay: recurrence === "weekly" ? weeklyDay : null,
      enableDonation,
      organizerContact,
      qrCode,
      organizer: req.user.id
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    await markCompletedEvents();

    const now = new Date();

    const events = await Event.find({
      completed: false
    });

    // 🔁 FINAL RECURRENCE LOOP
    for (const event of events) {
      if (event.createdByUserInfo) continue; // skip info events

      // Daily recurrence
      if (event.recurrence === "daily" && event.endsAt < now) {
        event.date.setDate(event.date.getDate() + 1);
        event.endsAt.setDate(event.endsAt.getDate() + 1);
        await event.save();
      }

      // Weekly recurrence
      if (
        event.recurrence === "weekly" &&
        event.endsAt < now &&
        event.weeklyDay !== null
      ) {
        const currentDay = event.date.getDay();
        let diff = event.weeklyDay - currentDay;
        if (diff <= 0) diff += 7;

        event.date.setDate(event.date.getDate() + diff);
        event.endsAt.setDate(event.endsAt.getDate() + diff);
        await event.save();
      }
    }

    const updatedEvents = await Event.find({
      completed: false
    })
      .populate("organizer", "name")
      .populate("volunteers", "name")
      .sort({ date: 1 });

    res.json(updatedEvents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDonatableEvents = async (req, res) => {
  const events = await Event.find({
    enableDonation: true,
    recurrence: { $in: ["daily", "weekly"] }
  });
  res.json(events);
};

export const getNearbyEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

/* 🔁 DASHBOARD FUNCTION */
export const getDashboardEvents = async (req, res) => {
  try {
    const userId = req.user.id;

    const conducted = await Event.find({ organizer: userId })
      .populate("organizer", "name")
      .populate("volunteers", "name");

    const volunteered = await Event.find({ volunteers: userId })
      .populate("organizer", "name")
      .populate("volunteers", "name");

    const infoEvents = await Event.find({
      createdByUserInfo: true,
      organizer: userId
    })
      .populate("organizer", "name");

    res.json({ conducted, volunteered, infoEvents });
  } catch (err) {
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
};

/* ✅ DELETE FUNCTION */
export const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.organizer.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await event.deleteOne();
  res.json({ message: "Event deleted" });
};
