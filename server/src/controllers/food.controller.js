import FoodLocation from "../models/FoodLocation.model.js";

export const getFoodLocations = async (req, res) => {
  const locations = await FoodLocation.find();
  res.json(locations);
};
