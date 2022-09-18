const express = require("express");

/*
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "aaa-image",
  },
});
const upload = multer({ storage });

cloudinary.config({
  cloud_name: "rasivyy",
  api_key: "599176842647747",
  api_secret: "OwpCImclbCniesVvDryv1c3pvSE",
});*/
//const storage = multer.memoryStorage();
//const upload = multer({ dest: "./public/data/uploads/" });
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
