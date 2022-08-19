const UserModel = require("../models/user.model");
//const ObjectID = require("mongoose").Types.ObjectId;

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
