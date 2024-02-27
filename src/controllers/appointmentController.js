import io, { onlineUsers } from "../app.js";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../config.js";

export const createAppointment = async (req, res) => {
  const { patientName, patientID, schedule, doctorID, doctorName } = req.body;
  console.log(doctorID);
  const notification = {
    senderName: patientName,
    data: `You have an appointment with ${patientName}`,
    recieverID: doctorID,
    isSent: onlineUsers[doctorID] ? true : false,
    createdAt: serverTimestamp(),
    purpose: true,
    info: {
      message: `You have an appointment with ${patientName}`,
      sender: patientName,
      userID: doctorID,
      daysToContinue: schedule,
    },
  };

  try {
    const docRef = await addDoc(
      collection(db, "notificationsV2"),
      notification
    );
    io.emit("Appointment", {
      message: `You have an appointment with ${patientName}`,
      sender: patientName,
      userID: doctorID,
      daysToContinue: schedule,
    });
  } catch (error) {
    return res.status(200).json({ message: "Creating Appointment failed" });
  }

  const newRecord = {
    patientName: patientName,
    patientID: patientID,
    doctorID: doctorID,
    doctorName: doctorName,
    date: schedule,
    createdAt: serverTimestamp(),
  };

  try {
    const docRef = await addDoc(collection(db, "appointmentsV2"), newRecord);
    return res.status(200).json({ message: "Appointment Created" });
  } catch (err) {
    console.error(err);
  }

  return res.status(200).json({ message: "Creating Appointment failed" });
};
