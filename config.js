// src/config.js

export const PORT = process.env.PORT || 4000;

// TODO: setja réttar slóðir þegar þú hefur aðgang að gagnaveitu Vegagerðarinnar
export const VEGAGERD_WEATHER_URL = "https://gagnaveita.vegagerdin.is/api/vefur/vefurvefur"; // dæmi
export const VEGAGERD_ROAD_URL    = "https://gagnaveita.vegagerdin.is/api/faerd/faerd";      // dæmi

export const CACHE_TTL_MS = 5 * 60 * 1000; // 5 mínútur
