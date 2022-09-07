const postModel = require("../models/post.model");
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");

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

/* post image
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
};*/

module.exports.postImage = async (req, res) => {
  console.log(req.files);
  res.send("Vos photos ont été uploadé !");

  /*
  const data = await sharp(req.file.buffer).webp({ quality: 20 }).toBuffer();
  const stream = cloudinary.uploader.upload_stream(
    { folder: "DEVVV" },
    (error, result) => {
      if (error) return console.error(error);
      return res.json({ URL: result.secure_url });
    }
  );
  bufferToStream(data).pipe(stream);*/
};
