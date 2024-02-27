import io, { onlineUsers } from "../app.js";
import db from "../config.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const createRecord = async (req, res) => {
  const {
    userID,
    name,
    batch,
    session,
    department,
    disease,
    medicines,
    doctorID,
    doctorName,
  } = req.body;

  let hasAntibiotic = false;
  let daysToContinue = 0;

  medicines.forEach(async (element) => {
    if (element["quantity"] > daysToContinue) {
      daysToContinue = element["quantity"];
    }
    if (element["isAntibiotic"]) {
      hasAntibiotic = true;
    }
  });

  if (hasAntibiotic) {
    const notification = {
      senderName: doctorName,
      data: `You have been prescribed an Antibiotic by Dr. ${doctorName}`,
      recieverID: userID,
      isSent: onlineUsers[userID] ? true : false,
      purpsoe: false,
      createdAt: serverTimestamp(),
      info: {
        message: `You have been prescribed an Antibiotic by Dr. ${doctorName}`,
        userID: userID,
        sender: doctorName,
        daysToContinue: daysToContinue,
      },
    };

    try {
      const docRef = await addDoc(
        collection(db, "notificationsV2"),
        notification
      );
      io.emit("notification", {
        message: `A new antibiotic prescription has been made by ${doctorName}.`,
        userID: userID,
        sender: doctorName,
        daysToContinue: daysToContinue,
      });
      const newRecord = {
        patientName: name,
        patientUserID: userID,
        batch: batch,
        session: session,
        department: department,
        disease: disease,
        medicines: medicines,
        doctorID: doctorID,
        createdAt: serverTimestamp(),
      };
      const dpcRef = await addDoc(collection(db, "patientRecordV2"), newRecord);
      return res.status(200).json({ message: "Record Created" });
    } catch (error) {
      console.error(error);
    }
    return res.status(200).json({ message: "Creating Record failed" });
  }
};
