import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  userID: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  designation: String,
  hospitalName: String,
  department: String,
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
