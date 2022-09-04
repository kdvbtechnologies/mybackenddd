require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const express = require("express");

const authRoute = require("./routes/auth.route");
const postRoute = require("./routes/post.route");
const userRoute = require("./routes/user.route");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


var corsOptions = {
  origin: "https://jamelfase.com",
  /*credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,*/
  /*
  Access-Control-Allow-Origin: "https://jamelfase.com",
  */
};
app.use(cors(corsOptions));

// jwt
app.get("*", checkUser);
/* cette route get de /jwtid et0 */
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// routes
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/user", userRoute);

// server
app.listen(process.env.PORT, () => {
  console.log(`Server ${process.env.PORT} is running !`);
});
