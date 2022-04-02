// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
const cookieParser = require("cookie-parser");
// internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errohandler.js");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");
const moment = require("moment");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
global.io = io; // declaring io globally to get it(by global.io) from any file
dotenv.config();
app.locals.moment = moment; // set comment as app locals

// database connection
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z6ers.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log({ err }));

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // we are using this middleware so that the backend can understand the encoded requests data ,sent from form

// set view plugins
app.set("view engine", "ejs"); // it will check the view folder // this can read the ejs files we wrote there

// set static folder
app.use(express.static(path.join(__dirname, "public"))); // using this middleware to show the public data(no auth required) if requested

// cookie parser
// steps : search wordpress solt generator > copy second line's second string(without quotation) >> search "sha1 online" >> paste >> hash button >> copy value >> put in .env secret key.
app.use(cookieParser(process.env.SECRET_KEY)); // this will parse the signed (something like hashed) cookies sent from header in req.
// for more:  http://expressjs.com/en/resources/middleware/cookie-parser.html#:~:text=cookieParser(secret%2C%20options,secret%20in%20order

// routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// error handling
// not found error handler
app.use(notFoundHandler);
// default error handler
app.use(errorHandler);
app.listen(process.env.PORT || 5000, () => {
  console.log(`app listening at http://localhost:${process.env.PORT}`);
});
