require("dotenv").config();
const express = require("express");

const User = require("./models/user");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const path = require("path");

const { mongoConnect } = require("./database");

app.use(express.static(path.join(__dirname, "public")));

const bodyParser = require("body-parser");

const { get404Page } = require("./controllers/error");

const adminRoutes = require("./routes/admin");

const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  User.findById("614d4126844afd63da29c44b")
    .then(user => {
      const { username, email, cart } = user;
      req.user = new User(username, email, cart, user._id);
      next();
    })
    .catch(err => {
      console.log(err);
      next();
    });
});

app.use("/admin", adminRoutes);
app.use("/", shopRoutes);

app.use(get404Page);

mongoConnect(() => {
  app.listen(3000);
});
