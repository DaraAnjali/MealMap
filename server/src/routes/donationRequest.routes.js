import express from "express";
import upload from "../utils/upload.js";
import protect from "../middlewares/auth.middleware.js";
import {
  createDonationRequest,
  getDonationRequests,
  getMyDonationRequests,
  deleteDonationRequest
} from "../controllers/donationRequest.controller.js";

const router = express.Router();

router.post("/", protect, upload.single("qrCode"), createDonationRequest);
router.get("/", getDonationRequests);

// ✅ MUST be before :id
router.get("/my", protect, getMyDonationRequests);

router.delete("/:id", protect, deleteDonationRequest);

export default router;
