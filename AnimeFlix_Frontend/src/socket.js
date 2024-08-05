import { io } from "socket.io-client";
const API_URL = `${import.meta.env.VITE_BACKEND_SERVER_PORT}`;

// const URL =   "ws://localhost:3000";
const URL =   API_URL;

export const socket = io(URL);
