import notiModel from "../models/notiModel.js";

export const getUnsentNotifications = async () => {
  let notis;

  try {
    notis = await notiModel.find({ isSent: false });
  } catch (error) {
    console.error(error);
  }

  if (notis) {
    for (let n = 0; n < notis.length; n++) {
      notis[n]["isSent"] = true;
      await notis[n].save();
    }
    return notis;
  } else {
    return [];
  }
};

export const getNotifications = async (req, res) => {
  const { uid } = req.params;

  let notis;

  try {
    notis = await notiModel.find({ recieverID: uid });
  } catch (error) {
    res.status(200).json({ message: "fetching notifications failed" });
  }

  if (notis) {
    return res
      .status(200)
      .json({ message: "Noti loaded", notis: notis.reverse() });
  } else {
    return res.status(200).json({ message: "No Notificaitons Found" });
  }
};

export const deleteNotification = async (req, res) => {
  const { id } = req.params;

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
