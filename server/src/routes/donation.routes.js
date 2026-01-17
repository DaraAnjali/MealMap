import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { makeDonation, getMyDonations } from "../controllers/donation.controller.js";

const router = express.Router();

router.post("/", authMiddleware, makeDonation);
router.get("/my", authMiddleware, getMyDonations);

export default router;
