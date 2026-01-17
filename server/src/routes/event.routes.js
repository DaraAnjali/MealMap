import express from "express";
import {
  createEvent,
  getEvents,
  getDonatableEvents,
  getNearbyEvents,
  getDashboardEvents
} from "../controllers/event.controller.js";

import { createInfoEvent } from "../controllers/infoEvent.controller.js";
import { deleteEvent } from "../controllers/event.controller.js";

import protect from "../middlewares/auth.middleware.js";
import upload from "../utils/upload.js";

const router = express.Router();

/* ===================== CREATE EVENT (WITH QR IMAGE) ===================== */
router.post(
  "/",
  protect,
  upload.single("donationQr"),
  createEvent
);

/* ===================== GET ALL EVENTS ===================== */
router.get("/", getEvents);
router.delete("/:id", protect, deleteEvent);

/* ===================== DONATABLE EVENTS ===================== */
router.get("/donate", getDonatableEvents);

/* ===================== NEARBY EVENTS ===================== */
router.get("/nearby", getNearbyEvents);

/* ===================== DASHBOARD EVENTS ===================== */
router.get("/dashboard", protect, getDashboardEvents);

/* ===================== INFO EVENT ===================== */
router.post("/info", protect, upload.none(), createInfoEvent);

export default router;
