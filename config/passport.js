const passport = require("passport");
const LocalStrategy = require("passport-local");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const UserModel = require("./../database/models/user_model");

// This will serialize the user.id into the session, which will then be pulled in the deserialize func.
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// This uses the id that was stored in the session to find our user.
passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
    new LocalStrategy(
      {
        usernameField: "username"
      },
      async (username, password, done) => {
        const user = await UserModel.findOne({ username }).catch(done);
  
        if (!user || !user.verifyPasswordSync(password)) {
          return done(null, false); // This is how to return an error
        }
  
        return done(null, user); // logged in correctly
      }
    )
  );

passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: req => {
          let token = null;
  
          if (req && req.cookies) {
            token = req.cookies["jwt"];
          }
  
          return token;
        },
        secretOrKey: process.env.JWT_SECRET
      },
      async (jwtPayload, done) => {
        const user = await UserModel.findById(jwtPayload.sub).catch(done);
        // Now we don't have to verify a password, as the JWT Token acts as the authorization itself.
        if (!user) {
          return done(null, false);
        }
  
        return done(null, user);
      }
    )
  );
  
  module.exports = passport;
  