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
  // origin: "",
  //credentials: true,
  "Access-Control-Allow-Origin": "https://jamelfase.com",
  "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": '"sessionId", X-Requested-With, Content-Type',
  "Access-Control-Allow-Credentials": true,
  // allowedHeaders: ["sessionId", "Content-Type"],
  // exposedHeaders: ["sessionId"],
  //methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,",
  // preflightContinue: false,
};
app.use(cors(corsOptions));

//routes
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/user", userRoute);

// server
app.listen(process.env.PORT, () => {
  console.log(`Server ${process.env.PORT} is running !`);
});
