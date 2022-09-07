const express = require("express");
const { addPost, getAllPost } = require("../controllers/post.controller");

const postRouter = express.Router();

postRouter.post("/add", addPost);
postRouter.post("/", getAllPost);

module.exports = postRouter;
