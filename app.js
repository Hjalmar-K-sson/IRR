//Requiring necessary packages:
const express = require("express");
const path = require("path");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

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

//Setting up & configuring express-session (for storing session data, cookies)
const secret = process.env.SECRET || "NotYetASecret"; //Find a good way to generate encrypted secret!
const store = MongoStore.create({
  mongoUrl: dbUrl,
  secret,
  touchAfter: 24 * 3600,
});

const sessionConfig = {
  store,
  secret,
  name: "sesh",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.alert = req.flash("alert");
  next();
});

//Connecting router to app
const homeRoute = require("./routes/home");
const restaurantsRoutes = require("./routes/restaurants");
app.use("/home", homeRoute);
app.use("/restaurants", restaurantsRoutes);

//Listening for requests
app.listen(3000, () => {
  console.log("Server running...");
});
