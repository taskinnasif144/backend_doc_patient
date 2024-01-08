import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import GridFsStorage from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import { uploadFile } from "../controllers/filesController.js";

const router = express.Router();

const conn = mongoose.connection;

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

const urlFile =
  "mongodb+srv://YimbsCorporation:yimbsAtYourService@docpatientclusteru.lpfrgin.mongodb.net/test?retryWrites=true&w=majority";

const storage = GridFsStorage({
  url: `${urlFile}`,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "uploads",
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadFile);

export { router as fileRounter };
