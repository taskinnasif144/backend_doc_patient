import express from "express";
import {
  createAppointment,
  createAppointment2,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/create", createAppointment);
router.post("/create-2", createAppointment2);

export { router as appointmentRouter };
