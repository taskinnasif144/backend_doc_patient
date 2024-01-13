import mongoose from "mongoose";

const fileSchema = mongoose.Schema(
  {
    fileName: String,
    fileUrl: String,
  },
  {
    timestamps: true,
  }
);

const fileModel = mongoose.model("files", fileSchema);

export default fileModel;
