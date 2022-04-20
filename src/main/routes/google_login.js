const passport = require("passport");

module.exports = {
  getGoogleLogin: [
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    }),
  ],

  handleGoogleLogin: [
    passport.authenticate("google", {
      failureRedirect: "/login?login_failed",
    }),
    function (req, res) {
      res.redirect("/");
    },
  ],
};
