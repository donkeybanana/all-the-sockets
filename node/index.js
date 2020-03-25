const http = require("http");
const express = require("express");
const web = require("./routes/web.js");
const useSockets = require("./routes/sockets.js");
const app = express();
const server = http.createServer(app);

// Sockets
const wss = useSockets(server);

// HTTP
app.use("/", web(wss));
app.use(express.static("public"));

// Bind
const { PORT = 8081 } = process.env;
server.listen(PORT);
console.log("Listening on", PORT);
