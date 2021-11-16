const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username });
    const newUser = await User.register(user, password);
    req.login(newUser, (err) => {
      if (err) return next(err);
      req.flash(
        "success",
        `Welcome to the Independent Restaurant Review, ${newUser.username}!`
      );
      res.redirect("/restaurants");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

//Add login & logout controllers
