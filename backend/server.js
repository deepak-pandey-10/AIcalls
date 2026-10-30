
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "VoiceReach AI API",
    message: "Backend is running successfully",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "VoiceReach AI API",
    timestamp: new Date().toISOString(),
  });
});

const leadRoutes = require("./routes/lead.routes");

app.use("/api/leads", leadRoutes);

app.listen(PORT, () => {
  console.log(`VoiceReach AI API running at http://localhost:${PORT}`);
});
