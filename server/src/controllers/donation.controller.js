import Donation from "../models/Donation.model.js";
import Event from "../models/Event.model.js";

// POST donation
export const makeDonation = async (req, res) => {
  try {
    const { eventId, amount, message } = req.body;

    const donation = await Donation.create({
      user: req.user.id,
      event: eventId,
      amount,
      message
    });

    res.json({ message: "Donation successful", donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET my donations
export const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.user.id })
      .populate("event", "title");

    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
