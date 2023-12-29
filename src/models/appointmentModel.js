import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema(
  {
    patientName: { type: String, required: true },
    patientID: { type: String, required: true },
    doctorName: { type: String, required: true },
    doctorID: { type: String, required: true },
    date: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const appointmentModel = mongoose.model("Appointment", appointmentSchema);

export default appointmentModel;
