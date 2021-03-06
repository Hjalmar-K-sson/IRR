const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../public/javascripts/utilities/catchAsync");
const users = require("../public/javascripts/controllers/users");

router
  .route("/register")
  .get(users.renderRegister)
  .post(catchAsync(users.register));

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    users.login
  );

router.get("/logout", users.logout);
//Add login & logout routes + create login.ejs view!
module.exports = router;
