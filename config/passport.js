const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const monCon = require("./database");
const User = require("../models/user");
const validPassword = require("../lib/passwordUtils").validPassword;

// const customeFields = {
//   username: "auser",
//   password: "apass",
// };
const verifyCallback = async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return done(null, false, { message: "User not found" });
    }

    const isValid = validPassword(password, user.hash, user.salt);

    if (!isValid) {
      return done(null, false, { message: "Invalid password" });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const strategy = new LocalStrategy(verifyCallback); //customeFields,
passport.use(strategy);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(null, false, { message: "User not found" });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});
