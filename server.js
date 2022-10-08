require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const express = require("express");
const app = express();

const authRoute = require("./routes/auth.route");
const postRoute = require("./routes/post.route");
const userRoute = require("./routes/user.route");
const postRouteOmisify = require("./routes/post.route.omisify");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
const corsOptions = {
  origin: ["https://jamelfase.com", "https://omisify.com"],
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

// jwt
app.get("*", checkUser);
/* cette route get de /jwtid */
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// routes
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/user", userRoute);
app.use("/omisify/api/user", postRouteOmisify);

// server
app.listen(process.env.PORT, () => {
  console.log(`Server ${process.env.PORT} is running !`);
});
