import express from "express";
import {
  deleteNotification,
  getNotifications,
} from "../controllers/notiController.js";

const router = express.Router();

router.get("/:uid", getNotifications);
router.delete("/delete/:id", deleteNotification);

export { router as notiRouter };
