const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Store latest received payload in memory for now
let latestData = {
  status: "no_data_yet",
  receivedAt: null,
  payload: null
};

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Health check
app.get("/", (req, res) => {
  res.send("SIM800 Node.js server running");
});

// ESP32 + SIM800 sends JSON here
app.post("/data", (req, res) => {
  latestData = {
    status: "ok",
    receivedAt: new Date().toISOString(),
    payload: req.body
  };

  console.log("Received JSON:");
  console.log(JSON.stringify(req.body, null, 2));

  res.status(200).json({
    status: "ok",
    message: "Data received"
  });
});

// Dashboard fetches latest received data
app.get("/latest", (req, res) => {
  res.json(latestData);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});