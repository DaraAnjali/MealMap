import express from "express";
import { getFoodLocations } from "../controllers/food.controller.js";

const router = express.Router();

router.get("/", getFoodLocations);

export default router;
