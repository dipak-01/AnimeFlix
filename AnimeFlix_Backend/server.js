import express from "express";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

export { app, httpServer };
