import mongoose from "mongoose";

const notiSchema = mongoose.Schema(
  {
    senderName: String,
    data: String,
    recieverID: String,
  },
  {
    timestamps: true,
  }
);

const notiModel = mongoose.model("notifications", notiSchema);

export default notiModel;
