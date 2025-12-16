import express from "express";
import http from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });

let tabs = 0;

io.on("connection", (socket) => {
  tabs++;
  io.emit("tabsCount", tabs);

  socket.on("disconnect", () => {
    tabs--;
    io.emit("tabsCount", tabs);
  });
});

/* Serve React build */
app.use(express.static(join(__dirname, "../client/dist")));

// Catch-all route для React Router
app.get(/.*/, (_, res) => {
  res.sendFile(join(__dirname, "../client/dist/index.html"));
});

/* Start server */
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
