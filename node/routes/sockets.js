const WS = require("ws");
const url = require("url");
const wss = new WS.Server({ noServer: true });

module.exports = server => {
  wss.on("connection", conn => {
    console.log(`[ats-node](ws): connect`);

    conn.on("message", data => {
      const message = JSON.parse(data);

      console.log(`[ats-node](ws): ${data}`);

      switch (message.type) {
        case "join":
          conn.send(`Welcome, ${message.name}!`);
          wss.clients.forEach(function each(client) {
            if (client !== conn && client.readyState === WS.OPEN) {
              client.send(`${message.name} joined! Give them a warm welcome!`);
            }
          });
          break;
      }
    });
  });

  server.on("upgrade", (req, socket, head) => {
    const path = url.parse(req.url).pathname;
    console.log(`[ats-node](upgrade): path=${path}`);

    if (path === "/ws") {
      wss.handleUpgrade(req, socket, head, ws => {
        wss.emit("connection", ws, req);
      });
    } else {
      socket.destroy();
    }
  });

  return wss;
};
