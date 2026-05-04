export function calculateHazard({ windSpeed, roadCondition, driftingSnow, previousHazard }) {
  let hazard = "none";

  if (windSpeed > 25 || driftingSnow === "heavy" || roadCondition === "white") {
    hazard = "orange";
  }

  if (windSpeed > 35 || driftingSnow === "severe") {
    hazard = "red";
  }

  return {
    hazard,
    triggerPopup: hazard !== previousHazard
  };
}
