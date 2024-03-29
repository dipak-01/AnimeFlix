import express from "express";
import cors from "cors";
import homePageRouter from "./routes/homePageRoute.js";
import otherPagesRouter from "./routes/otherPagesRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'none'; font-src https://fonts.gstatic.com;"
  );
  next();
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
  console.log("hi");
});
const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", homePageRouter);
app.use("/", otherPagesRouter);
