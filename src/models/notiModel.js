import mongoose from "mongoose";

const notiSchema = mongoose.Schema(
  {
    senderName: String,
    data: String,
    recieverID: String,
    isSent: Boolean,
    purpose: Boolean,
    info: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

const notiModel = mongoose.model("notifications", notiSchema);

export default notiModel;
