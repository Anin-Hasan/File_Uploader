const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");
const { sessionMiddleware } = require("./config/session");
const passport = require("./config/passport");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRoutes);
app.use("/files", fileRoutes);

app.listen(3000, () => console.log("app listening on port 3000!"));
