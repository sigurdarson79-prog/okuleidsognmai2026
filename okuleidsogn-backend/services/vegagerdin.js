import fetch from "node-fetch";

export async function getWeather(lat, lon) {
  const url = `https://gagnaveita.vegagerdin.is/api/vedur?lat=${lat}&lon=${lon}`;
  const res = await fetch(url);
  const data = await res.json();

  return {
    windSpeed: data.wind?.speed ?? 0,
    windDirection: data.wind?.direction ?? 0,
    gust: data.wind?.gust ?? 0
  };
}

export async function getRoad(lat, lon) {
  const url = `https://gagnaveita.vegagerdin.is/api/faerd?lat=${lat}&lon=${lon}`;
  const res = await fetch(url);
  const data = await res.json();

  return {
    condition: data.condition ?? "unknown",
    snow: data.snow ?? "none",
    distanceAhead: data.distanceAhead ?? 0
  };
}
