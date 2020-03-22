const WS = require("ws");
const url = require("url");
const wss = new WS.Server({ noServer: true });

module.exports = server => {
  wss.on("connection", conn => {
    console.log(`[ats-node](ws): connect`);

    conn.on("message", data => {
      const message = JSON.parse(data);

      console.log(`[ats-node](ws): type=${message.type}`);

      switch (message.type) {
        case "boleh":
          conn.send(
            JSON.stringify({
              message: "WebSockets boleh!"
            })
          );
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
