export async function apiGetHazard(lat, lon) {
  const url = `https://api.okuleidsogn.is/api/hazard?lat=${lat}&lon=${lon}`;
  const res = await fetch(url);
  return res.json();
}
