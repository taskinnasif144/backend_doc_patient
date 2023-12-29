import express from "express";
import {
  createAppointment,
  getAppointments,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/create", createAppointment);
router.get("/get/:designation/:id", getAppointments);

export { router as appointmentRouter };
