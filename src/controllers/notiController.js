import io, { onlineUsers } from "../app.js";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import db from "../config.js";

export const getUnsentNotifications = async () => {
  let data = [];

  try {
    const querySnapshot = await getDocs(collection(db, "notificationsV2"));

    querySnapshot.forEach((doc) => {
      let docData = doc.data();
      var notifications = {
        id: doc.id,
        data: doc.data(),
      };
      data.push(notifications);
    });
  } catch (error) {
    console.error(error);
  }

  const filteredNotification = data.filter((noti) => {
    const recieverID = noti.data.recieverID;
    const status = noti.data.isSent;
    return onlineUsers[recieverID] && !status;
  });
  if (filteredNotification.length > 0) {
    for (let n = 0; n < filteredNotification.length; n++) {
      const docID = filteredNotification[n].id;
      const notificationRef = doc(db, "notificationsV2", docID);
      await updateDoc(notificationRef, {
        isSent: true,
      });
    }
    return filteredNotification;
  } else {
    return [];
  }
};

export const getUnsentNotifications2 = async () => {
  let data = [];

  try {
    const querySnapshot = await getDocs(collection(db, "notifications"));

    querySnapshot.forEach((doc) => {
      let docData = doc.data();
      var notifications = {
        id: doc.id,
        data: doc.data(),
      };
      data.push(notifications);
    });
  } catch (error) {
    console.error(error);
  }

  const filteredNotification = data.filter((noti) => {
    const recieverID = noti.data.recieverID;
    const status = noti.data.isSent;
    return onlineUsers[recieverID] && !status;
  });
  if (filteredNotification.length > 0) {
    for (let n = 0; n < filteredNotification.length; n++) {
      const docID = filteredNotification[n].id;
      const notificationRef = doc(db, "notifications", docID);
      await updateDoc(notificationRef, {
        isSent: true,
      });
    }
    return filteredNotification;
  } else {
    return [];
  }
};
