require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@web-development-2.cglha.mongodb.net/shop?retryWrites=true&w=majority`;

const User = require("./models/user");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

const bodyParser = require("body-parser");

const { get404Page } = require("./controllers/error");

const adminRoutes = require("./routes/admin");

const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  User.findById("614e5e4bba687292c43edae4")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404Page);

mongoose
  .connect(uri)
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          username: "braiderp",
          email: "braidencparkinson@gmail.com",
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
