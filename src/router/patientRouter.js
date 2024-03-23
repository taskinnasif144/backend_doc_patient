import express from "express";
import {
  createRecord,
  createRecord2,
} from "../controllers/patientCntroller.js";

const router = express.Router();

router.post("/create-record", createRecord);
router.post("/create-record-2", createRecord2);

export { router as patientRouter };
