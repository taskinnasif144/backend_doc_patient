import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();
// import { userRouter } from "./router/userRouter.js";
import { patientRouter } from "./router/patientRouter.js";

import http from "http";
import { Server } from "socket.io";

import { appointmentRouter } from "./router/appointmentRouter.js";
import {
  getUnsentNotifications,
  getUnsentNotifications2,
} from "./controllers/notiController.js";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors());

export var onlineUsers = {};

io.on("connection", (socket) => {
  console.log("connected");
  let userID = socket.handshake.query.userID;
  onlineUsers[userID] = true;

  console.log(onlineUsers);

  getUnsentNotifications().then((value) => {
    for (let index = 0; index < value.length; index++) {
      if (value[index]["purpose"]) {
        io.emit("Appointment", value[index]["data"]["info"]);
      } else {
        io.emit("notification", value[index]["data"]["info"]);
      }
    }
  });
  getUnsentNotifications2().then((value) => {
    for (let index = 0; index < value.length; index++) {
      if (value[index]["purpose"]) {
        io.emit("Appointment2", value[index]["data"]["info"]);
      } else {
        io.emit("notification2", value[index]["data"]["info"]);
      }
    }
  });

  console.log(onlineUsers);
  socket.on("disconnect", () => {
    delete onlineUsers[userID];
    console.log(onlineUsers);
  });
});

// app.use("/auth", userRouter);
app.use("/patient", patientRouter);
app.use("/appointments", appointmentRouter);

server.listen(3000, function () {
  console.log("Server is listening on port 3000!");
});

export default io;
