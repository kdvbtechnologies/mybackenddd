const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minLenght: 6,
      trim: true,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    coverPicture: {
      type: String,
      default: "",
    },

    followers: {
      type: [String],
    },

    following: {
      type: [String],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
