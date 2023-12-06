import mongoose from "mongoose";

const MedicineSchema = new mongoose.Schema({
  medicineName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  isAntibiotic: {
    type: Boolean,
    required: true,
  },
});

const patientRecordSchema = mongoose.Schema(
  {
    patientName: { type: String, required: true },
    patientUserID: { type: String, required: true },
    batch: String,
    session: String,
    disease: String,
    department: String,
    medicines: [MedicineSchema],
    doctorID: String,
  },
  {
    timestamps: true,
  }
);

const patientRecordModel = mongoose.model(
  "patient-records",
  patientRecordSchema
);

export default patientRecordModel;
