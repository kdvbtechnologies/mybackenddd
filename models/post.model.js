const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      //required: true,
    },
    isComplete: {
      type: Boolean,
    },
    desc: {
      type: String,
      max: 500,
      //required: true,
    },
    username: {
      type: String,
      //required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    imageUrl: {
      type: String,
    },

    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
