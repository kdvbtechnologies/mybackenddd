const UserModel = require("../models/user.model");
const { signUpErrors } = require("../utils/error.util");
const bcrypt = require("bcryptjs");

module.exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await UserModel.findOne({ email }).exec();

  if (user) {
    return res.status(401).json({
      message: "Un utilisateur existe déjà avec cette adresse email",
    });
  }
  const hashedPassword = bcrypt.hashSync(password);

  try {
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    res
      .status(200)
      .json({ message: "Inscription reussie avec succès ! " + user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(400).send({ errors });
  }
};
