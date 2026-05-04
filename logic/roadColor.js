// src/logic/roadColor.js

export function getRoadColor(status) {
  const s = (status || "").toLowerCase();

  if (s.includes("lokað") || s.includes("ófært")) return "red";
  if (s.includes("þungfært")) return "#cc66ff";      // fjólublár
  if (s.includes("snjó")) return "#66b3ff";          // blár
  if (s.includes("hálka") && !s.includes("blett")) return "#ffcc00"; // appelsínugulur
  if (s.includes("hálkublett")) return "#ffff66";    // gulur
  if (s.includes("greiðfært")) return "#00cc44";     // grænn

  return "#999999"; // óþekkt / engar upplýsingar
}
