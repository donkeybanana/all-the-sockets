const path = require("path");
const WS = require("ws");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

module.exports = wss => {
  router.get("/", (req, res) => {
    console.log(`[ats-node](web): GET /`);
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  router.post("/", bodyParser.text({ type: "*/*" }), (req, res) => {
    console.log(`[ats-node](web): POST / body=${req.body}`);

    const message = {
      ack: req.body
    };

    // Broadcast
    wss.clients.forEach(function each(client) {
      if (client.readyState === WS.OPEN) {
        client.send(JSON.stringify(message));
      }
    });

    // Ack
    res.json(message);
  });

  return router;
};
