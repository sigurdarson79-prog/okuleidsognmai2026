export function buildHazardPayload(weather, road) {
  return {
    windSpeed: weather.windSpeed,
    windDirection: weather.windDirection,
    gust: weather.gust,
    roadCondition: road.condition,
    driftingSnow: road.snow,
    distanceAhead: road.distanceAhead
  };
}
