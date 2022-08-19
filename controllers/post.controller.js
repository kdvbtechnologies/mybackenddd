const postModel = require("../models/post.model");

module.exports.addPost = async (req, res) => {
  const newPost = new postModel(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
};
