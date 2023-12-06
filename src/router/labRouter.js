import express from "express";
import {
  getArbRecords,
  createARB,
  getSingleARB,
  getAllARBRecord,
  deleteARB,
} from "../controllers/labControler.js";

const router = express.Router();

router.get("/get-arb-records/:uid", getArbRecords);
router.get("/get-single-arb/:uid", getSingleARB);
router.get("/get-records", getAllARBRecord);

router.post("/create-ARB", createARB);
router.delete("/delete-arb/:id", deleteARB);

export { router as labRouter };
