const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoute = require("./src/routes/user");
const authRRoute = require("./src/routes/auth");
const postRoute = require("./src/routes/blog");

const app = express();
dotenv.config();
mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connect DB success");
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/v1/user", userRoute);
app.use("/v1/auth", authRRoute);
app.use("/v1/post-article", postRoute);

app.listen(8000, () => {
  console.log("server is running");
});
