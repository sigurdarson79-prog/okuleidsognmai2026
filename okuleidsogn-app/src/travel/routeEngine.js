export function getPoint10kmAhead({ latitude, longitude, heading }) {
  const distance = 10000;
  const R = 6371000;
  const rad = (deg) => (deg * Math.PI) / 180;

  const lat2 = latitude + (distance / R) * Math.cos(rad(heading));
  const lon2 = longitude + (distance / R) * Math.sin(rad(heading));

  return { latitude: lat2, longitude: lon2 };
}
