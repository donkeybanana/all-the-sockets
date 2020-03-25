class AllTheSockets {
  constructor(name) {
    this.name = name;
    this.socket = new WebSocket("ws://localhost:8081/ws");
    this.socket.addEventListener("open", this.onOpen.bind(this));
    this.socket.addEventListener("message", this.onMessage.bind(this));
    this.socket.addEventListener("close", this.onClose.bind(this));
  }

  onOpen() {
    this.socket.send(
      JSON.stringify({
        type: "join",
        name: this.name
      })
    );
  }

  onMessage(e) {
    const { data: message } = e;
    const li = document.createElement("li");
    li.innerHTML = message;
    document.getElementById("messages").append(li);
  }

  onClose() {
    alert("Server closed the session");
    window.location.reload();
  }
}

(() => {
  window.formhandler = form => {
    const {
      name: { value }
    } = form.elements;
    const name = value || "Nobody";

    new AllTheSockets(name);

    form.remove();

    return false;
  };
})();
