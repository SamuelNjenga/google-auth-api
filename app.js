const express = require("express");
const app = express();
const path = require("path");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash-messages");
const passportConfig = require("./src/main/db/config/passport")(passport);

const { getHomePage } = require("./src/main/routes/index");
const {
  getGoogleLogin,
  handleGoogleLogin,
} = require("./src/main/routes/google_login");
const { handleLogout, postLogin, getLogin } = require("./src/main/routes/login");

const PORT = 5000;

app.use(
  session({
    secret: "keyboard cat",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set("port", process.env.PORT);
app.set("views", __dirname + "/src/main/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));



app.get("/", getHomePage);
app.get("/auth/google", getGoogleLogin);
app.get("/auth/google/callback", handleGoogleLogin);

app.post("/login", postLogin);
app.get("/login", getLogin);
app.get("/logout", handleLogout);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
