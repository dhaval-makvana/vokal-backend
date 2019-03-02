var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var Users = require("./models/Users");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken");

var config = require("./config");

exports.local = passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

exports.getToken = function(user) {
  return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

var opts = {};

/* jwt should be extracted from the request */
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    // console.log("JWT payload: ", jwt_payload);
    Talent.findOne({ _id: jwt_payload._id }, (err, talent) => {
      if (err) {
        return done(err, false);
      } else if (talent) {
        return done(null, talent);
      } else {
        return done(null, false);
      }
    });
  })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });
