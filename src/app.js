import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { userRouter } from "./router/userRouter.js";
import { patientRouter } from "./router/patientRouter.js";
import { labRouter } from "./router/labRouter.js";
import http from "http";
import { Server } from "socket.io";
import { notiRouter } from "./router/notiRouter.js";
import { appointmentRouter } from "./router/appointmentRouter.js";
import { fileRounter } from "./router/fileRouter.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/patient", patientRouter);
app.use("/lab", labRouter);
app.use("/noti", notiRouter);
app.use("/appointments", appointmentRouter);
app.use("/files", fileRounter);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const urlApp = process.env.MONGO_URL;

mongoose
  .connect(urlApp, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => server.listen(process.env.PORT || 3000))
  .then(() => console.log("Server connected and database is also connected"))
  .catch((err) => console.error(err));

export default io;
