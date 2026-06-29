import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String },
    address: { type: String },

    mineName: { type: String, default: "" },
    mineLocation: { type: String, default: "" },
    mineDescription: { type: String, default: "" }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);
