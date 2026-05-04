// src/routes/roadRoutes.js

import { Router } from "express";
import { fetchRoads } from "../services/vegagerdRoad.js";

const router = Router();

router.get("/roads", async (req, res) => {
  try {
    const data = await fetchRoads();
    res.json(data);
  } catch (err) {
    console.error("Road route error:", err.message);
    res.status(500).json({ error: "road_fetch_failed" });
  }
});

export default router;
