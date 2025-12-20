import { io } from "socket.io-client";
import { useSocketStore } from "../store/useSocketStore.js";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
});

socket.on("connect", () => console.log("Socket connected", socket.id));

socket.on("tabsCount", (count) => {
  console.log("tabsCount from server:", count);
  useSocketStore.getState().setActiveTabs(count);
});

export default socket;
