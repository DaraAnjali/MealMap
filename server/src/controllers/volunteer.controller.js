import Event from "../models/Event.model.js";

/**
 * Volunteer for an event
 * (Same logic as joinEvent)
 */
export const volunteerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.volunteers.includes(userId)) {
      return res.status(400).json({ message: "Already volunteered" });
    }

    event.volunteers.push(userId);
    await event.save();

    res.status(201).json(event);
  } catch (err) {
    console.error("Volunteer Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get events user volunteered for
 */
export const getMyVolunteering = async (req, res) => {
  try {
    const userId = req.user.id;

    const events = await Event.find({
      volunteers: userId
    }).sort({ date: 1 });

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const cancelVolunteering = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.volunteers = event.volunteers.filter(
      (v) => v.toString() !== userId
    );

    await event.save();
    res.json({ message: "Volunteering cancelled" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
