import express from "express";

import {
  getUploadedFiles,
  uploadFile,
} from "../controllers/filesController.js";

const router = express.Router();

router.post("/upload", uploadFile);
router.get("/get", getUploadedFiles);

export { router as fileRounter };
