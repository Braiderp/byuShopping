const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

const {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
  getReset,
  postReset,
  getNewPassword,
  postNewPassword
} = authController;

router.get("/login", getLogin);

router.get("/signup", getSignup);

router.post("/signup", postSignup);

router.post("/login", postLogin);

router.post("/logout", postLogout);

router.get("/reset", getReset);

router.post("/reset", postReset);

router.get("/reset/:token", getNewPassword);

router.post("/new-password", postNewPassword);

module.exports = router;
