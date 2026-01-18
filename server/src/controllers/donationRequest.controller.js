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
      qrCode: `/uploads/${req.file.filename}`,
      createdBy: req.user.id
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

/* ✅ GET MY DONATION REQUESTS */
export const getMyDonationRequests = async (req, res) => {
  try {
    const requests = await DonationRequest.find({
      createdBy: req.user.id
    }).sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE DONATION REQUEST */
export const deleteDonationRequest = async (req, res) => {
  const donation = await DonationRequest.findById(req.params.id);

  if (!donation) {
    return res.status(404).json({ message: "Not found" });
  }

  if (donation.createdBy.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await donation.deleteOne();
  res.json({ message: "Donation request deleted" });
};
