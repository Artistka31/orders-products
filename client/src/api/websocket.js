import { io } from "socket.io-client";
import { useStore } from "../store/useStore";

const socket = io();

socket.on("tabsCount", (count) => {
  useStore.getState().setActiveTabs(count);
});

export default socket;
