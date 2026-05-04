import * as Location from "expo-location";

export async function startGPS(onUpdate) {
  await Location.requestForegroundPermissionsAsync();

  return Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 1000,
      distanceInterval: 1
    },
    (pos) => {
      const { latitude, longitude, speed, heading } = pos.coords;
      onUpdate({ latitude, longitude, speed, heading });
    }
  );
}
