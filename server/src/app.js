import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import path from "path";
import donationRequestRoutes from "./routes/donationRequest.routes.js";
import authRoutes from "./routes/auth.routes.js";
import volunteerRoutes from "./routes/volunteer.routes.js";
import donationRoutes from "./routes/donation.routes.js";
import eventRoutes from "./routes/event.routes.js";

dotenv.config();
connectDB();

const app = express();

// ------------------ CORS ------------------
const allowedOrigins = [process.env.FRONTEND_URL]; // FRONTEND_URL from .env

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow Postman / curl
      if (!allowedOrigins.includes(origin)) {
        return callback(new Error("CORS blocked this origin"), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// ------------------ Middleware ------------------
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ------------------ Routes ------------------
app.use("/api/auth", authRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/donation-requests", donationRequestRoutes);

export default app;
