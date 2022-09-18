const postModel = require("../models/post.model");
const { Readable } = require("stream");
const cloudinary = require("cloudinary").v2;
/*const fs = require("fs");
const cloudinary = require("cloudinary");
const sharp = require("sharp");
const path = require("path");
const multer = require("multer");
const stream = require("stream");*/

module.exports.addPost = async (req, res) => {
  const newPost = new postModel(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.getAllPost = async (req, res) => {
  let posts;
  try {
    posts = await postModel.find().select();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
  }
};

// post image
/*
cloudinary.config({
  cloud_name: "rasivyy",
  api_key: "599176842647747",
  api_secret: "OwpCImclbCniesVvDryv1c3pvSE",
});

const { Readable } = require("stream");
const bufferToStream = (buffer) => {
  const readable = new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
  return readable;
};

module.exports.postImage = async (req, res) => {
  
  try {
    res.send("Vos photos ont été uploadé !");
    //console.log(req.files);
  } catch (err) {
    console.log(err);
  }

  const data = await sharp(req.file.buffer).webp({ quality: 20 }).toBuffer();
  const stream = cloudinary.uploader.upload_stream(
    { folder: "DEVVV" },
    (error, result) => {
      if (error) return console.error(error);
      return res.json({ URL: result.secure_url });
    }
  );
  bufferToStream(data).pipe(stream);
};*/

cloudinary.config({
  cloud_name: "rasivyy",
  api_key: "599176842647747",
  api_secret: "OwpCImclbCniesVvDryv1c3pvSE",
});

module.exports.postImage = async (req, res) => {
  //const { imageUrl } = req.body;
  //  const { buffer } = req.file;
  try {
    cloudinary(req.file.path, function (err, result) {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("back");
      }
      req.body.post.image = result.secure_url;
    });

    /*console.log(req.file);
    const newImage = new postModel({
      imageUrl,
    });
    await newImage.save();
    res.json(newImage.imageUrl);*/
  } catch (err) {
    res.send("erreur, reessayer !");
    console.log(err);
  }
};
