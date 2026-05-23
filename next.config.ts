import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

try {
  const rootDir = process.cwd();
  const publicCheatsDir = path.join(rootDir, "public", "cheats");
  
  if (!fs.existsSync(publicCheatsDir)) {
    fs.mkdirSync(publicCheatsDir, { recursive: true });
  }

  const filesToMove = [
    "Dead_by_Daylight_—_Arcane_202605212335.jpeg",
    "Deadside_—_Arcane_Deadside_✦_202605212335.jpeg",
    "Dune__Awakening_—_Arcane_✦_202605212335.jpeg",
    "Farlight_84_—_Arcane_✦_202605212335.jpeg",
    "Gray_Zone_Warfare_—_Fellas_202605231215.jpeg",
    "Hell_Let_Loose_—_Arcane_202605231215.jpeg",
    "HighGuard_—_Arcane_✦_Positive__202605231215.jpeg",
    "HumanitZ_—_Arcane_✦_Positive__202605231216.jpeg",
    "WID_Spoofer_—_Vector_Spoofer_202605231215.jpeg"
  ];

  filesToMove.forEach(file => {
    const src = path.join(rootDir, file);
    const dest = path.join(publicCheatsDir, file);
    if (fs.existsSync(src)) {
      fs.renameSync(src, dest);
      console.log(`Successfully moved ${file} to public/cheats/`);
    }
  });
} catch (e) {
  console.error("Failed to automatically move images:", e);
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
