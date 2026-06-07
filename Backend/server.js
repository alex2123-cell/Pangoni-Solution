const express = require("express");
const cors = require("cors");
const os = require("os");

const app = express();
app.use(cors());

// System Info
app.get("/system", (req, res) => {
    res.json({
        platform: os.platform(),
        cpu: os.cpus().length + " cores",
        uptime: os.uptime()
    });
});

// Optimize (dummy for now)
app.get("/optimize", (req, res) => {
    res.send("Optimization complete ✅");
});

// Antivirus (mock)
app.get("/antivirus", (req, res) => {
    res.send("No threats found 🛡️");
});

// Network
app.get("/network", (req, res) => {
    res.send("Network is stable 🌐");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});