import { io } from "socket.io-client";
import { useSocketStore } from "../store/useSocketStore.js";

const URL = import.meta.env.DEV
  ? "http://localhost:3000"
  : window.location.origin;
const socket = io(URL, { transports: ["websocket"] });

socket.on("connect", () => console.log("Socket connected", socket.id));

socket.on("tabsCount", (count) => {
  console.log("tabsCount from server:", count);
  useSocketStore.getState().setActiveTabs(count);
});

export default socket;
