const express = require("express");
const { getAllPost } = require("../controllers/post.controller.omisify");

const postRouter = express.Router();

postRouter.get("/", getAllPost);

module.exports = postRouter;
