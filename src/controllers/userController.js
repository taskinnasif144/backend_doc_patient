import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import patientRecordModel from "../models/patientRecord.js";

export const loginUser = async (req, res) => {
  const { userID, password } = req.body;
  let user;
  try {
    user = await userModel.findOne({ userID: userID });
  } catch (e) {
    console.error(e);
  }
  if (!user) {
    return res.status(200).json({ message: "User not Found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (isPasswordCorrect) {
    const token = jwt.sign({ id: user._id }, "secret");
    res.status(200).json({
      token: token,
      userID: user._id,
      user: user,
      message: "User has been Authorized",
    });
  } else {
    res
      .status(200)
      .json({ message: "User not Authorized, check password again" });
  }
};

export const createUser = async (req, res) => {
  const { name, userID, password, designation, hospitalName, department } =
    req.body;

  let existingUser;
  try {
    existingUser = await userModel.findOne({ userID: userID });
  } catch (err) {
    console.error(err);
  }

  if (existingUser) {
    return res.status(400).json({ message: "User already exist" });
  }
  const saltedPass = bcrypt.hashSync(password, 10);
  const newUser = new userModel({
    name: name,
    userID: userID,
    password: saltedPass,
    designation: designation,
    hospitalName: hospitalName,
    department: department,
  });

  try {
    await newUser.save();
    res.status(200).json({ message: "User created" });
  } catch (err) {
    res.status(200).json({ message: "Something went Wrong" });
  }
};

export const searchPatient = async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(200).json([]);
  }
  let suggestion;

  try {
    suggestion = await userModel.find({
      $and: [
        {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { userID: { $regex: query, $options: "i" } },
          ],
        },
        { designation: "Patient" },
      ],
    });
  } catch (error) {
    console.error(error);
  }

  if (suggestion) {
    return res.status(200).json(suggestion);
  }
};

export const getMyRecords = async (req, res) => {
  const { uid } = req.params;

  let records = await patientRecordModel.find({
    patientUserID: uid,
  });

  if (!records) {
    return res.status(404).json({ message: "Something Went Wrong" });
  } else if (records === undefined || records.length == 0) {
    return res
      .status(200)
      .json({ message: "No Records Found", records: records });
  } else {
    records.reverse();
    return res.status(200).json({ message: "Records Found", records: records });
  }
};

export const searchDoctors = async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(200).json([]);
  }
  let suggestion;

  try {
    suggestion = await userModel.find({
      $and: [
        {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { userID: { $regex: query, $options: "i" } },
            { department: { $regex: query, $options: "i" } },
          ],
        },
        { designation: "Doctor" },
      ],
    });
  } catch (error) {
    console.error(error);
  }

  if (suggestion) {
    return res.status(200).json(suggestion);
  }
};

export const getSingleUserRecord = async (req, res) => {
  const { id } = req.params;
  let patientRecords;
  try {
    patientRecords = await userModel.findOne({ userID: id });
  } catch (error) {
    console.error(error);
  }

  if (patientRecords) {
    res.status(200).json(patientRecords);
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};
