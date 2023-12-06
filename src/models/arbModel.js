import mongoose from "mongoose";

const arbSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    userID: { type: String, required: true },
    amoxycillin: String,
    azithromycin: String,
    cefotaxime: String,
    chloramphenicol: String,
    doxycycline: String,
    imipenem: String,
    levofloxacin: String,
  },
  {
    timestamps: true,
  }
);

const arbModel = mongoose.model("ARB-Records", arbSchema);

export default arbModel;
