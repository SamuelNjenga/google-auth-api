const User = require("../models/index")["User"];
const GoogleStrategy = require("passport-google-oauth20").Strategy;
//
//
//  PASSPORT CONFIG
//
//
module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_APP_CALLBACK_URL,
      },
      async function (accessToken, refreshToken, profile, cb) {
        const [user, status] = await User.findOrCreate({
          where: {
            social_user_id: profile.id,
            name: profile.displayName,
            registration_type: "google",
            email: profile.emails[0].value,
          },
        });
        cb(null, user);
      }
    )
  );
};
