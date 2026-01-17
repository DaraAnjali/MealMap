import express from "express";
import upload from "../utils/upload.js";
import {
  createDonationRequest,
  getDonationRequests
} from "../controllers/donationRequest.controller.js";

const router = express.Router();

router.post("/", upload.single("qrCode"), createDonationRequest);
router.get("/", getDonationRequests);

export default router;
