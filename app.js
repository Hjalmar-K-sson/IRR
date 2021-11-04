const express = require("express");
const path = require("path");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const homeRoute = require("./routes/home");
const restaurantsRoutes = require("./routes/restaurants");
app.use("/home", homeRoute);
app.use("/restaurants", restaurantsRoutes);

app.listen(3000, () => {
  console.log("Server running...");
});
