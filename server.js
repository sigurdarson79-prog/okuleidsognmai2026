// src/server.js

import express from "express";
import cors from "cors";
import { PORT } from "./config.js";

import weatherRoutes from "./routes/weatherRoutes.js";
import roadRoutes from "./routes/roadRoutes.js";
import combinedRoutes from "./routes/combinedRoutes.js";

const app = express();

// Leyfir JSON og CORS (app + vefur geta talað við API)
app.use(cors());
app.use(express.json());

// Health check / root endpoint
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Okuleiðsögn backend is running"
  });
});

// Tengjum routes
app.use("/api", weatherRoutes);
app.use("/api", roadRoutes);
app.use("/api", combinedRoutes);

// Ræsum serverinn
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
