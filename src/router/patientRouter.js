import express from "express";
import { createRecord } from "../controllers/patientCntroller.js";

const router = express.Router();

router.post("/create-record", createRecord);

export { router as patientRouter };
