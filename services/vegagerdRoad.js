// src/services/vegagerdRoad.js

import axios from "axios";
import { VEGAGERD_ROAD_URL, CACHE_TTL_MS } from "../config.js";
import { getCache, setCache } from "../cache/memoryCache.js";
import { getRoadColor } from "../logic/roadColor.js";

export async function fetchRoads() {
  const cacheKey = "roads";
  const cached = getCache(cacheKey);
  if (cached) return cached;

  let response;

  try {
    response = await axios.get(VEGAGERD_ROAD_URL, { timeout: 8000 });
  } catch (err) {
    console.error("Villa við að sækja færðargögn:", err.message);
    return []; // skilar tómu í stað þess að drepa serverinn
  }

  const raw = response.data;

  // Vegagerðin notar mismunandi heiti eftir endpoint
  const list =
    Array.isArray(raw) ? raw :
    Array.isArray(raw.kaflar) ? raw.kaflar :
    Array.isArray(raw.data) ? raw.data :
    [];

  const processed = list
    .map((k) => {
      const id = k.id || k.nr || k.kafli || null;
      const name = k.heiti || k.lysing || k.nafn || "Óþekktur vegkafli";

      const status =
        k.faerd ||
        k.stada ||
        k.condition ||
        k.road_condition ||
        "";

      // Hnit geta verið á mismunandi formi
      const coords =
        Array.isArray(k.hnit) ? k.hnit :
        Array.isArray(k.coordinates) ? k.coordinates :
        Array.isArray(k.points) ? k.points :
        [];

      // Tryggjum að hnit séu á formi [{lat, lon}, ...] eða [ [lat, lon], ... ]
      const normalizedCoords = coords
        .map((c) => {
          if (Array.isArray(c) && c.length === 2) {
            return { lat: Number(c[0]), lon: Number(c[1]) };
          }
          if (c && typeof c === "object") {
            return {
              lat: Number(c.lat || c.breidd),
              lon: Number(c.lon || c.lengd)
            };
          }
          return null;
        })
        .filter((c) => c && !isNaN(c.lat) && !isNaN(c.lon));

      return {
        id,
        name,
        status,
        color: getRoadColor(status),
        coords: normalizedCoords
      };
    })
    .filter((k) => k.coords.length > 0); // fjarlægir vegi án hnitakerfis

  setCache(cacheKey, processed, CACHE_TTL_MS);
  return processed;
}
