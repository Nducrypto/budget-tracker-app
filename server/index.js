import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import homeRoutes from "./routes/page.js";
import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/page", homeRoutes);
app.use("/api/users", userRoutes);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/build/index.html"))
);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((req, res) =>
    app.listen(PORT, () => console.log(`Server Running on Port:${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connect`));
