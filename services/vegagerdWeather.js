// src/services/vegagerdWeather.js

import axios from "axios";
import { VEGAGERD_WEATHER_URL, CACHE_TTL_MS } from "../config.js";
import { getCache, setCache } from "../cache/memoryCache.js";
import { getWindColor } from "../logic/windColor.js";

export async function fetchWeather() {
  const cacheKey = "weather";
  const cached = getCache(cacheKey);
  if (cached) return cached;

  let response;

  try {
    response = await axios.get(VEGAGERD_WEATHER_URL, { timeout: 8000 });
  } catch (err) {
    console.error("Villa við að sækja veður:", err.message);
    return []; // skilar tómu í stað þess að drepa serverinn
  }

  const raw = response.data;

  // Vegagerðin notar mismunandi heiti eftir endpoint
  const list =
    Array.isArray(raw) ? raw :
    Array.isArray(raw.stodvar) ? raw.stodvar :
    Array.isArray(raw.data) ? raw.data :
    [];

  const processed = list
    .map((s) => {
      const lat = Number(s.lat || s.breidd || s.latitude);
      const lon = Number(s.lon || s.lengd || s.longitude);

      if (isNaN(lat) || isNaN(lon)) return null;

      const vindur =
        Number(s.vindhradi || s.vindhr || s.wind_speed || 0);

      const hviður =
        Number(s.vindhviður || s.vindhviður_m_s || s.gust || s.wind_gust || 0);

      const att =
        Number(s.vindatt || s.vindatt_grd || s.wind_direction || 0);

      const hiti =
        Number(s.hiti || s.hiti_2m || s.temperature || 0);

      return {
        name: s.stod || s.nafn || s.name || "Óþekkt stöð",
        lat,
        lon,
        wind: vindur,
        gust: hviður,
        dir_deg: att,
        temp: hiti,
        color: getWindColor(vindur, hviður)
      };
    })
    .filter(Boolean); // fjarlægir null

  setCache(cacheKey, processed, CACHE_TTL_MS);
  return processed;
}
