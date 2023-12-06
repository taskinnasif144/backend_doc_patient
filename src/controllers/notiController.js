import notiModel from "../models/notiModel.js";

export const getNotifications = async (req, res) => {
  const { uid } = req.params;

  let notis;

  try {
    notis = await notiModel.find({ recieverID: uid });
  } catch (error) {
    res.status(200).json({ message: "fetching notifications failed" });
  }

  if (notis) {
    return res.status(200).json({ message: "Noti loaded", notis: notis });
  } else {
    return res.status(200).json({ message: "No Notificaitons Found" });
  }
};

export const deleteNotification = async (req, res) => {
  const { id } = req.params;
  console.log("deleting");
  let result;

  try {
    result = await notiModel.findByIdAndRemove(id);
  } catch (error) {
    console.error(error);
  }

  if (result) {
    return res.status(200).json({ message: "deleted" });
  } else {
    return res.status(200).json({ message: "delete failed" });
  }
};
