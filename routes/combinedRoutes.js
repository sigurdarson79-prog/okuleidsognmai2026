// src/routes/combinedRoutes.js

import { Router } from "express";
import { fetchWeather } from "../services/vegagerdWeather.js";
import { fetchRoads } from "../services/vegagerdRoad.js";

const router = Router();

router.get("/map", async (req, res) => {
  try {
    // Keyrum bæði í einu til að flýta fyrir
    const [weather, roads] = await Promise.all([
      fetchWeather(),
      fetchRoads()
    ]);

    res.json({
      weather,
      roads
    });
  } catch (err) {
    console.error("Combined route error:", err.message);
    res.status(500).json({ error: "combined_fetch_failed" });
  }
});

export default router;
