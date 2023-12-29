import io from "../app.js";
import appointmentModel from "../models/appointmentModel.js";
import notiModel from "../models/notiModel.js";

export const createAppointment = async (req, res) => {
  const { patientName, patientID, schedule, doctorID, doctorName } = req.body;

  const notification = new notiModel({
    senderName: patientName,
    data: `You have an appointment with ${patientName}`,
    recieverID: doctorID,
  });

  try {
    await notification.save();
    io.emit("Appointment", {
      message: `You have an appointment with ${patientName}`,
      sender: patientName,
      userID: doctorID,
      daysToContinue: 1,
    });
  } catch (error) {
    console.error(error);
  }

  const newRecord = new appointmentModel({
    patientName: patientName,
    patientID: patientID,
    doctorID: doctorID,
    doctorName: doctorName,
    date: schedule,
  });

  try {
    await newRecord.save();
    return res.status(200).json({ message: "Appointment Created" });
  } catch (err) {
    console.error(err);
  }

  return res.status(200).json({ message: "Creating Appointment failed" });
};

export const getAppointments = async (req, res) => {
  const { designation, id } = req.params;

  let queary;

  if (designation === "Patient") {
    queary = { patientID: id };
  } else {
    queary = { doctorID: id };
  }

  let apointments;

  try {
    apointments = await appointmentModel.find(queary);
  } catch (err) {
    console.error(err);
  }

  if (apointments) {
    apointments.reverse();
    return res.status(200).json({ message: "data Found", data: apointments });
  } else {
    return res.status(404).json({ messaeg: "No data found" });
  }
};

export const deleteAppointment = async (req, res) => {
  console.log("inside delete");
  const { id } = req.params;

  let result;

  console.log("inside function, id is", id);

  try {
    result = await appointmentModel.findByIdAndRemove(id);
  } catch (error) {
    console.error(error);
  }

  if (result) {
    return res.status(200).json({ message: "deleted" });
  } else {
    return res.status(200).json({ message: "delete failed" });
  }
};
