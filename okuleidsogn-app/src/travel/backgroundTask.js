import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { handleTravelMode } from "./TravelModeController";

TaskManager.defineTask("travel-mode-task", async ({ data }) => {
  const loc = data.locations[0];

  const gps = {
    latitude: loc.coords.latitude,
    longitude: loc.coords.longitude,
    speed: loc.coords.speed,
    heading: loc.coords.heading
  };

  await handleTravelMode(gps);
});

export async function startBackgroundGPS() {
  await Location.requestForegroundPermissionsAsync();
  await Location.requestBackgroundPermissionsAsync();

  await Location.startLocationUpdatesAsync("travel-mode-task", {
    accuracy: Location.Accuracy.Highest,
    timeInterval: 1000,
    distanceInterval: 1,
    showsBackgroundLocationIndicator: true,
    foregroundService: {
      notificationTitle: "Okuleiðsögn",
      notificationBody: "Travel Mode virkt"
    }
  });
}
