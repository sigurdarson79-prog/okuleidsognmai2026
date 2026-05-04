// src/routes/weatherRoutes.js

import { Router } from "express";
import { fetchWeather } from "../services/vegagerdWeather.js";

const router = Router();

router.get("/weather", async (req, res) => {
  try {
    const data = await fetchWeather();
    res.json(data);
  } catch (err) {
    console.error("Weather route error:", err.message);
    res.status(500).json({ error: "weather_fetch_failed" });
  }
});

export default router;
