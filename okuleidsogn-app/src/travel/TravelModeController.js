import { getPoint10kmAhead } from "./routeEngine";
import { apiGetHazard } from "../api/apiClient";
import { calculateHazard } from "../risk/riskEngine";
import { uiCallbacks } from "../ui/uiCallbacks.native";

let previousHazard = "none";

export async function handleTravelMode(gps) {
  if (gps.speed < 8 / 3.6) return;

  const ahead = getPoint10kmAhead(gps);

  const data = await apiGetHazard(ahead.latitude, ahead.longitude);

  const result = calculateHazard({
    ...data,
    previousHazard
  });

  if (result.triggerPopup) {
    uiCallbacks.showPopup({
      hazard: result.hazard,
      text: result.text,
      countdown: 60
    });
  }

  previousHazard = result.hazard;
}
