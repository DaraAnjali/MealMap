import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    locationName: { type: String, required: true },
    address: { type: String, required: true },

    coordinates: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }
    },

    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    endsAt: { type: Date, required: true },

    eventType: {
      type: String,
      enum: ["General", "AyyappaDeeksha", "Special"],
      default: "General"
    },

    recurrence: {
      type: String,
      enum: ["one-time", "daily", "weekly"],
      default: "one-time"
    },

    weeklyDay: { type: Number, min: 0, max: 6, default: null },

    enableDonation: { type: Boolean, default: false },
    qrCode: { type: String, default: null },
    organizerContact: { type: String },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },

    volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    completed: { type: Boolean, default: false },

    createdByUserInfo: { type: Boolean, default: false },
    infoDisclaimer: { type: String, default: "" }
  },
  { timestamps: true }
);

eventSchema.index({ coordinates: "2dsphere" });

export default mongoose.model("Event", eventSchema);
