import io from "../app.js";
import arbModel from "../models/arbModel.js";
import notiModel from "../models/notiModel.js";
import patientRecordModel from "../models/patientRecord.js";

export const createRecord = async (req, res) => {
  const {
    userID,
    name,
    batch,
    session,
    department,
    disease,
    medicines,
    doctorID,
    doctorName,
  } = req.body;

  medicines.forEach(async (element) => {
    if (element["isAntibiotic"]) {
      const notification = new notiModel({
        senderName: doctorName,
        data: "You have been prescribed an Antibiotic",
        recieverID: userID,
      });

      try {
        await notification.save();
        io.emit("notification", {
          message: "A new antibiotic prescription has been made.",
          userID: userID,
        });
      } catch (error) {
        console.error(error);
      }
    }
  });

  const newRecord = new patientRecordModel({
    patientName: name,
    patientUserID: userID,
    batch: batch,
    session: session,
    department: department,
    disease: disease,
    medicines: medicines,
    doctorID: doctorID,
  });

  try {
    await newRecord.save();
    return res.status(200).json({ message: "Record Created" });
  } catch (err) {
    console.error(err);
  }

  return res.status(200).json({ message: "Creating Record failed" });
};

export const getPatientRecord = async (req, res) => {
  let patientRecordList;

  try {
    patientRecordList = await patientRecordModel.find({});
  } catch (err) {
    console.error(err);
  }

  if (patientRecordList) {
    patientRecordList.reverse();
    return res.status(200).json(patientRecordList);
  } else {
    return res.status(404).json({ messaeg: "No data found" });
  }
};

export const getSinglePatientRecord = async (req, res) => {
  const { pid } = req.params;
  let patientRecords;
  try {
    patientRecords = await patientRecordModel.findOne({ _id: pid });
  } catch (error) {
    console.error(error);
  }

  if (patientRecords) {
    res.status(200).json(patientRecords);
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const searchPatientReport = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(200).json([]);
  }

  let records;

  try {
    records = await patientRecordModel.find({
      $or: [
        { patientName: { $regex: query, $options: "i" } },
        { patientUserID: { $regex: query, $options: "i" } },
      ],
    });
  } catch (error) {
    console.error(error);
  }

  if (records) {
    return res.status(200).json(records);
  }
};

export const isActive = async (req, res) => {
  const { pid } = req.params;

  let record;
  let isActive = false;

  try {
    record = await patientRecordModel.find({ patientUserID: pid });
  } catch (error) {
    console.error(error);
  }

  if (record) {
    if (record.length != 0) {
      record.reverse();
      record[0]["medicines"].forEach((e) => {
        if (e["isAntibiotic"]) {
          isActive = true;
        }
      });
    }

    res.json({ active: isActive });
  }
};

export const updateAntibiotic = async (req, res) => {
  const { pid } = req.body;

  console.log("pid", pid);

  let record;
  let isLeft = false;

  try {
    record = await patientRecordModel.find({ patientUserID: pid });
  } catch (error) {
    console.error(error);
  }

  if (record) {
    record.reverse();

    if (record.length != 0) {
      for (let e of record[0]["medicines"]) {
        if (e["isAntibiotic"]) {
          if (e["quantity"] > 0) {
            if (e["quantity"] > 1) {
              isLeft = true;
            } else if (e["quantity"] == 1) {
              e["isAntibiotic"] = false;
            }
            e["quantity"] = e["quantity"] - 1;

            try {
              await record[0].save();
            } catch (error) {
              console.error(error);
            }
          } else {
            e["isAntibiotic"] = false;
            try {
              await record[0].save();
            } catch (error) {
              console.error(error);
            }
          }
        }
      }
    }

    if (!isLeft) {
      return res.status(200).json({ message: false });
    } else {
      return res.status(200).json({ message: true });
    }
  }
};

export const deleteRecord = async (req, res) => {
  const { id } = req.params;
  let result;

  try {
    result = await patientRecordModel.findByIdAndRemove(id);
  } catch (error) {
    console.error(error);
  }

  if (result) {
    return res.status(200).json({ message: "deleted" });
  } else {
    return res.status(200).json({ message: "delete failed" });
  }
};
