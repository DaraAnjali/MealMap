import mongoose from "mongoose";

const donationRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    purpose: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    targetAmount: {
      type: Number,
      required: true
    },
    qrCode: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("DonationRequest", donationRequestSchema);
