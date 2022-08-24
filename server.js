require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const express = require("express");
const app = express();
const authRoute = require("./routes/auth.route");
const postRoute = require("./routes/post.route");
const userRoute = require("./routes/user.route");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//middleware
app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: "https://jamelfase.com",
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

/*
app.use(function (req, res, next) {
  //
  res.setHeader("Access-Control-Allow-Origin", "https://jamelfase.com");
  //
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  //
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type"
  );
  //
  res.setHeader("Access-Control-Allow-Credentials", true);

  //
  next();
});*/

//routes
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/user", userRoute);

// server
app.listen(process.env.PORT, () => {
  console.log(`Server ${process.env.PORT} is running !`);
});
