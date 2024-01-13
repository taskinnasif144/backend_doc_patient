import fileModel from "../models/fileModel.js";

export const uploadFile = async (req, res) => {
  const { fileUrl, fileName } = req.body;
  console.log("running");
  let file;
  try {
    file = await fileModel.findOne({ fileName: fileName });
  } catch (error) {
    console.error(error);
  }

  if (file) {
    return res.status(200).json({ message: "File already exists" });
  } else {
    const newRecord = new fileModel({
      fileName,
      fileUrl,
    });

    try {
      await newRecord.save();
      return res.status(200).json({ message: "Uploaded" });
    } catch (error) {
      return res.status(400);
    }
  }
};

export const getUploadedFiles = async (req, res) => {
  let files;
  try {
    files = await fileModel.find({});
  } catch (error) {
    console.error(error);
  }

  if (files) {
    console.log();

    return res.status(200).json({ message: "File Loaded", files: files });
  } else {
    return res.status(200).json({ message: "No File Loaded", files: [] });
  }
};

export const deleteUplaodedFile = async (req, res) => {
  const { id } = req.params;
  console.log("delete", id);
  let files;
  try {
    files = await fileModel.findByIdAndRemove(id);
  } catch (error) {
    console.error(error);
  }

  if (files) {
    console.log(files);

    return res.status(200).json({ message: "File deleted", files: files });
  } else {
    return res.status(200).json({ message: "deletion failed", files: [] });
  }
};
