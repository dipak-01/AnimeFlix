import express from "express";
import { createServer } from "http";
import proxyRouter from "./routes/proxy.js";

const app = express();
const httpServer = createServer(app);

// Mount the proxy router
app.use("/api", proxyRouter);

export { app, httpServer };
