const mongoose = require("mongoose");

const forgotSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    accessToken: {
      type: String,
      required: true,
      unique: true,
    },
    isValid: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);
const Forgot = mongoose.model("Forgot", forgotSchema);
module.exports = Forgot;
