import express from "express";
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/create", createAppointment);
router.get("/get/:designation/:id", getAppointments);
router.delete("/delete/:id", deleteAppointment);

export { router as appointmentRouter };
