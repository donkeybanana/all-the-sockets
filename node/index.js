const WS = require("ws");

const server = new WS.Server({
  port: 8081
});

console.log("Listening on", 8081);

server.on("connection", conn => {
  conn.on("message", data => {
    const message = JSON.parse(data);

    switch (message.type) {
      case "boleh":
        console.log("[receive] boleh");
        conn.send(
          JSON.stringify({
            message: "WebSockets boleh!"
          })
        );
        break;
    }
  });
});
