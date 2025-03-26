var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const monCon = require("./config/database");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const bodyParser = require("body-parser");

var app = express();

//SESSION CODE-----------------------
const session = require("express-session");
const MongoStore = require("connect-mongo");

const sessionStore = new MongoStore({
  mongoUrl: process.env.DATABASE_URL,
  collectionName: "sessions",
});

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    store: sessionStore,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

//-------------------------------------

//PASSPORT SECTION---------------------------------------
const passport = require("passport");
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.user);
  console.log(req.session);
  next();
});

//----------------------------------------------------

// view engine setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
