import { io } from "socket.io-client";
const API_URL = `${import.meta.env.VITE_BACKEND_SERVER_PORT}`;
// "undefined" means the URL will be computed from the `window.location` object
const URL = API_URL === "production" ? undefined : "ws://localhost:3000";

export const socket = io(URL);
