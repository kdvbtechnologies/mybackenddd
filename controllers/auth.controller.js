const UserModel = require("../models/user.model");
const { signUpErrors } = require("../utils/error.util");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const maxAge = 90 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

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

module.exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).exec();
    if (!user) {
      return res.status(401).send({
        error: "a Email ou mot de passe incorrect !",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .send({ error: "bbb Email ou mot de passe incorrect !" });

    const token = createToken(user);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge,
      secure: true,
      domain: "https://api-adoony.herokuapp.com/api/v1/auth/signin",
      path: "/",
    });
    res.status(200).json({ message: "Vous etes connecté !" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.logOut = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
