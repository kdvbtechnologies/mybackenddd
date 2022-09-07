const express = require("express");
const multer = require("multer");
const upload = multer();

const {
  addPost,
  getAllPost,
  postImage,
} = require("../controllers/post.controller");

const postRouter = express.Router();

postRouter.post("/add", addPost);
postRouter.get("/", getAllPost);
postRouter.post("/upload", upload.single("image"), postImage);

module.exports = postRouter;
