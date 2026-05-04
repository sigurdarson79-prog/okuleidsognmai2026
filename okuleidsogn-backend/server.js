import express from "express";
import cors from "cors";
import hazardRoute from "./routes/hazard.js";

const app = express();
app.use(cors());
app.use(express.json());

// API route
app.use("/api/hazard", hazardRoute);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Okuleidsogn backend running on port ${PORT}`);
});
