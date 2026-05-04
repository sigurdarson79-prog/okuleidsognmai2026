import express from "express";
import { getWeather, getRoad } from "../services/vegagerdin.js";
import { getCache, setCache } from "../services/cache.js";
import { buildHazardPayload } from "../services/hazardEngine.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing lat/lon" });
  }

  const cacheKey = `hazard:${lat}:${lon}`;
  const cached = getCache(cacheKey);

  if (cached) {
    return res.json(cached);
  }

  try {
    const weather = await getWeather(lat, lon);
    const road = await getRoad(lat, lon);

    const payload = buildHazardPayload(weather, road);

    setCache(cacheKey, payload, 60_000); // 1 minute cache

    res.json(payload);
  } catch (err) {
    console.error("Hazard error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
