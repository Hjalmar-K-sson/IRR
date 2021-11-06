//Requiring necessary packages:
const express = require("express");
const path = require("path");
const ejs = require("ejs");

//Starting the express app:
const app = express();

//Setting view engine to EJS
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
