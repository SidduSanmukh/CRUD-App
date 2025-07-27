import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import route from "./routes/userRoute.js";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 8000;
const mongoURL = process.env.ConnString;

mongoose
  .connect(mongoURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at PORT ${PORT}`);
    });
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", route);
