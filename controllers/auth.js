const User = require("../models/user");

const bcrypt = require("bcryptjs");

const crypto = require("crypto");

const { validationResult } = require("express-validator/check");

const { sendMessage } = require("../email");

exports.getLogin = (req, res, next) => {
  let email,
    password = "";
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    oldInput: { email, password },
    validationErrors: []
  });
};

exports.getReset = (req, res, next) => {
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "reset password"
  });
};

exports.postReset = (req, res, next) => {
  try {
    console.log("post reset hit");
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        console.error(err);
        req.flash("error", err.message);
        return res.redirect("/reset");
      }
      const token = buffer.toString("hex");
      const { email } = req.body;
      const user = await User.findOne({ email });
      console.log("user", user);
      if (!user) {
        req.flash("error", "No account found under that email address");
        return res.redirect("/reset");
      }
      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 360000;
      await user.save();
      const html = `<p>You requested a password reset. Click <a href="http://localhost:3000/reset/${token}">here</a> to reset</p>`;
      await sendMessage(email, "Password Reset", html);
      return res.redirect("/");
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getSignup = (req, res, next) => {
  let email,
    password,
    confirmPassword = "";
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    oldInput: {
      email,
      password,
      confirmPassword
    },
    validationErrors: []
  });
};

exports.postSignup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const { email, password, confirmPassword } = req.body;
    const oldInput = { email, password, confirmPassword };
    if (!errors.isEmpty()) {
      req.flash("error", errors.array()[0].msg);
      return res.status(422).render("auth/signup", {
        path: "/signup",
        pageTitle: "Signup",
        oldInput,
        validationErrors: errors && errors.array() ? errors.array() : []
      });
    }
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
  } catch (error) {
    console.error(error);
  }
};
exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("error", errors.array()[0].msg);
    return res.render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      oldInput: {
        email,
        password
      },
      validationErrors: errors && errors.array() ? errors.array() : []
    });
  }
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
    .catch(err => {
      console.log(err);
      const e = new Error(err);
      next(e);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getNewPassword = async (req, res, next) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    });
    res.render("auth/new-password", {
      path: "/new-password",
      pageTitle: "new passwored",
      userId: user._id.toString() || null,
      passwordToken: token
    });
  } catch (e) {
    const error = new Error(e);
    console.log(e);
    next(error);
  }
};

exports.postNewPassword = async (req, res, next) => {
  try {
    const { password, userId, passwordToken } = req.body;
    const user = await User.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
      _id: userId
    });
    user.password = bcrypt.hashSync(password, 12);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    res.redirect("/login");
  } catch (e) {
    console.error(e);
  }
};
