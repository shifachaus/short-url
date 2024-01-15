const express = require("express");

const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMondoDb } = require("./connect");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");
const urlRoutes = require("./routes/url");
const staticRoutes = require("./routes/staticRouter");
const userRoutes = require("./routes/user");

const app = express();
const PORT = 8001;

//DB connection
connectToMondoDb("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("MongoDB Connected!");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

//Routers
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoutes);
app.use("/user", userRoutes);
app.use("/", staticRoutes);

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
