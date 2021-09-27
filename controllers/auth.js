const User = require("../models/user");

const bcrypt = require("bcryptjs");

const { sendMessage } = require("../email");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login"
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup"
  });
};

exports.postSignup = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    req.flash("error", "email already exists");
    return res.redirect("/signup");
  }
  const hashedPassword = bcrypt.hashSync(password, 12);
  user = new User({
    email,
    password: hashedPassword,
    cart: { items: [] }
  });
  await user.save();
  await sendMessage(
    email,
    "Signup Seccess",
    "<p>You successfully signedup</p>"
  );
  res.redirect("/login");
};
exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        req.flash("error", "invalid email or password");
        return res.redirect("/login");
      }
      const valid = bcrypt.compareSync(password, user.password);
      if (valid) {
        req.session.loggedIn = true;
        req.session.user = user;
        console.log("session", req.session);
        req.session.save(() => {
          res.redirect("/");
        });
      } else {
        req.flash("error", "invalid email or password");
        res.redirect("/login");
      }
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
