//Requiring necessary packages:
const express = require("express");
const path = require("path");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");

//Connecting app to MongoDB:
const dbUrl = "mongodb://localhost:27017/IRR";
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind("DB Connection error..."));
db.once("open", () => console.log("Database connected..."));

//Starting the express app:
const app = express();

//Setting view engine to EJS
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Setting up directory for serving static files
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connecting router to app
const homeRoute = require("./routes/home");
const restaurantsRoutes = require("./routes/restaurants");
app.use("/home", homeRoute);
app.use("/restaurants", restaurantsRoutes);

//Listening for requests
app.listen(3000, () => {
  console.log("Server running...");
});
