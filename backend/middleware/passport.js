const passport = require("passport");
const User = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = function PassportAuthMiddleware(app) {
  // let opts = {};
  // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  // opts.secretOrKey = "secret";

  // passport.use(
  //   new JwtStrategy(opts, function (jwt_payload, done) {
  //     User.findOne({ id: jwt_payload.sub }, function (err, user) {
  //       if (err) {
  //         return done(err, false);
  //       }
  //       if (user) {
  //         return done(null, user);
  //       } else {
  //         return done(null, false);
  //         // or you could create a new account
  //       }
  //     });
  //   })
  // );
  

  const authStrategy = new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      algorithms: ["HS256"],
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
    },
    async (payload, done) => {

  // return User.findOneById(payload.id)
  // .then(user=>{
  //   return cb(null, user)
  // })
  // .catch(err=>{
  //   return cb(err)
  // })

      console.log('payload');
      id = parseInt(payload.sub);
      console.log(id);
      if (id) {
       return done(null, id);
      } else {
        done(null, false);
      }
    }
  );

  passport.use(authStrategy);
  // app.use(passport.initialize());
};
