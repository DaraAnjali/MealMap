import DonationRequest from "../models/DonationRequest.model.js";

/* CREATE DONATION REQUEST */
export const createDonationRequest = async (req, res) => {
  try {
    const { name, purpose, contact, targetAmount } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "QR image required" });
    }

    const donation = await DonationRequest.create({
      name,
      purpose,
      contact,
      targetAmount,
      qrCode: `/uploads/${req.file.filename}`
    });

    res.status(201).json(donation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET ALL DONATION REQUESTS */
export const getDonationRequests = async (req, res) => {
  try {
    const donations = await DonationRequest.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
