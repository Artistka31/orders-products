import { io } from "socket.io-client";
import { useSocketStore } from "../store/useSocketStore.js";

const socket = io(import.meta.env.VITE_SOCKET_URL);

socket.on("connect", () => console.log("Socket connected", socket.id));

socket.on("tabsCount", (count) => {
  console.log("tabsCount from server:", count);
  useSocketStore.getState().setActiveTabs(count);
});

export default socket;
