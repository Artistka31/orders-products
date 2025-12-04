import { io } from "socket.io-client";
import { useStore } from "../store/useStore";

const socket = io("http://localhost:3001"); // нужно поднять простой сервер на Node.js

socket.on("tabsCount", (count) => {
  useStore.getState().setActiveTabs(count);
});

export default socket;
