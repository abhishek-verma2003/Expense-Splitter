import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  password: { type: String },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
});

export default mongoose.model("User", userSchema);
