import express from "express";
import {
  createUser,
  loginUser,
  searchPatient,
  getMyRecords,
  searchDoctors,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/createNewUser", createUser);
router.post("/userLogin", loginUser);
router.post("/users", searchPatient);
router.post("/doctors", searchDoctors);
router.get("/get-my-records/:uid", getMyRecords);

export { router as userRouter };
