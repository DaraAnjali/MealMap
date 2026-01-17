import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    message: String
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
