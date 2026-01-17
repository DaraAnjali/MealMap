import mongoose from "mongoose";

const foodLocationSchema = new mongoose.Schema(
  {
    name: String,
    coordinates: {
      lat: Number,
      lng: Number
    },
    timings: String
  },
  { timestamps: true }
);

export default mongoose.model("FoodLocation", foodLocationSchema);
