import arbModel from "../models/arbModel.js";

export const createARB = async (req, res) => {
  const {
    name,
    userID,
    amoxycillin,
    azithromycin,
    cefotaxime,
    chloramphenicol,
    doxycycline,
    imipenem,
    levofloxacin,
    meropenem,
    netilmicin,
    nitrofurantoin,
    piperacilin,
    fosfomycin,
    ciprocin,
  } = req.body;

  const newRecord = new arbModel({
    userID,
    name,
    amoxycillin,
    azithromycin,
    cefotaxime,
    chloramphenicol,
    doxycycline,
    imipenem,
    levofloxacin,
    meropenem,
    netilmicin,
    nitrofurantoin,
    piperacilin,
    fosfomycin,
    ciprocin,
  });

  try {
    await newRecord.save();
    return res.status(200).json({ message: "Record Created" });
  } catch (error) {}
};

export const getArbRecords = async (req, res) => {
  const { uid } = req.params;
  let arbRecords;
  try {
    arbRecords = await arbModel.find({ userID: uid });
    if (arbRecords) {
      return res
        .status(200)
        .json({ message: "ARB records found", records: arbRecords });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getSingleARB = async (req, res) => {
  const { uid } = req.params;

  let singleARB;
  try {
    singleARB = await arbModel.findOne({ _id: uid });
  } catch (error) {
    console.error(error);
  }

  if (singleARB) {
    res.status(200).json(singleARB);
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const getAllARBRecord = async (req, res) => {
  let patientRecordList;

  try {
    patientRecordList = await arbModel.find({});
  } catch (err) {
    console.error(err);
  }

  if (patientRecordList) {
    return res.status(200).json(patientRecordList);
  } else {
    return res.status(404).json({ messaeg: "No data found" });
  }
};

export const deleteARB = async (req, res) => {
  const { id } = req.params;

  let result;

  try {
    result = await arbModel.findByIdAndRemove(id);
  } catch (error) {
    console.error(error);
  }

  if (result) {
    return res.status(200).json({ message: "deleted" });
  } else {
    return res.status(200).json({ message: "delete failed" });
  }
};
