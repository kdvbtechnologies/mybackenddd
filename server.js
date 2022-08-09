require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const express = require("express");
const app = express();
const authRoute = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//middleware
app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: ["https://jamelfase.com", "http://localhost:3000"],
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

//routes
app.use("/api/v1/auth", authRoute);

// server
app.listen(process.env.PORT, () => {
  console.log(`Server ${process.env.PORT} is running !`);
});
