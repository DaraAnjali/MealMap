import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  volunteerForEvent,
  getMyVolunteering,
  cancelVolunteering
} from "../controllers/volunteer.controller.js";

const router = express.Router();

router.post("/", auth, volunteerForEvent);
router.get("/my", auth, getMyVolunteering);
router.delete("/:eventId", auth, cancelVolunteering);

export default router;
