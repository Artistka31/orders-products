import { io } from "socket.io-client";
import { useStore } from "../store/useStore";

const socket = io("http://localhost:3001"); // connects to a simple Node.js Socket.IO server running on port 3001

socket.on("tabsCount", (count) => {
  useStore.getState().setActiveTabs(count);
});

export default socket;
