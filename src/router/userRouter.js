import express from "express";
import {
  createUser,
  loginUser,
  searchPatient,
  getMyRecords,
  searchDoctors,
  getSingleUserRecord,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/createNewUser", createUser);
router.get("/get-record/:id", getSingleUserRecord);
router.post("/userLogin", loginUser);
router.post("/users", searchPatient);
router.post("/doctors", searchDoctors);
router.get("/get-my-records/:uid", getMyRecords);

export { router as userRouter };
