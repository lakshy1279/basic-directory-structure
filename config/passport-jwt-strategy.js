const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const env = require("./environment");
const User = require("../models/user");
let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_secret,
};
passport.use(
  new JWTStrategy(opts, function (jwtpayload, done) {
    // try {
    //   var user = User.findById(jwtpayload._id);
    //   return done(null, user);
    // } catch {
    //   return done(null, false);
    // }
    User.findById(jwtpayload._id, function (err, user) {
      if (user) {
        return done(null, user);
      } else {
        return done(null, flase);
      }
    });
  })
);

module.exports = passport;
