import express from "express";

import {
  deleteUplaodedFile,
  getUploadedFiles,
  uploadFile,
} from "../controllers/filesController.js";

const router = express.Router();

router.post("/upload", uploadFile);
router.get("/get", getUploadedFiles);
router.delete("/delete/:id", deleteUplaodedFile);

export { router as fileRounter };
