const express = require("express");
const { addPost } = require("../controllers/post.controller");

const postRouter = express.Router();

postRouter.post("/add", addPost);

module.exports = postRouter;
