// src/logic/windColor.js

export function getWindColor(vindur, hviður) {
  const v = Number(vindur) || 0;
  const h = Number(hviður) || 0;

  // Rautt: vindur EÐA hviður ≥ 26
  if (v >= 26 || h >= 26) return "red";

  // Gult: vindur OG hviður á bilinu 16–25
  if (v >= 16 && v <= 25 && h >= 16 && h <= 25) return "yellow";

  // Annars grænt
  return "green";
}
