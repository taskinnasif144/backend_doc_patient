import express from "express";
import {
  createRecord,
  getPatientRecord,
  getSinglePatientRecord,
  isActive,
  searchPatientReport,
  updateAntibiotic,
  deleteRecord,
} from "../controllers/patientCntroller.js";

const router = express.Router();

router.post("/create-record", createRecord);
router.get("/get-records", getPatientRecord);
router.get("/is-active/:pid", isActive);
router.put("/update-dose", updateAntibiotic);
router.get("/get-record/:pid", getSinglePatientRecord);
router.post("/get-suggestions", searchPatientReport);
router.delete("/delete-record/:id", deleteRecord);

export { router as patientRouter };
