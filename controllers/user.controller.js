const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  let users;
  try {
    users = await UserModel.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ users });
};

module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send({ message: "ID Inconnue" + req.params.id });

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else return res.status(401).json({ serverError: "server error" + err });
  }).select("-password");
};

/*
module.exports.getUsername = async (req, res) => {
  let username;
  try {
    username = await UserModel.find().select
  } catch (err) {
    console.log(err)
  }
}
*/
