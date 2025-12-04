import { Server } from "socket.io";

const io = new Server(3001, { cors: { origin: "*" } });

let tabs = 0;

io.on("connection", (socket) => {
  tabs++;
  io.emit("tabsCount", tabs);

  socket.on("disconnect", () => {
    tabs--;
    io.emit("tabsCount", tabs);
  });
});

console.log("WebSocket server running on http://localhost:3001");
