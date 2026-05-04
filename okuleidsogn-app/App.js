import { useEffect } from "react";
import { startBackgroundGPS } from "./src/travel/backgroundTask";
import { PopupProvider } from "./src/ui/PopupProvider";

export default function App() {
  useEffect(() => {
    startBackgroundGPS();
  }, []);

  return (
    <PopupProvider>
      {/* UI kemur seinna */}
    </PopupProvider>
  );
}
