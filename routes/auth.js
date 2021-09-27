const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

const { getLogin, postLogin, postLogout, getSignup, postSignup } =
  authController;

router.get("/login", getLogin);

router.get("/signup", getSignup);

router.post("/signup", postSignup);

router.post("/login", postLogin);

router.post("/logout", postLogout);

module.exports = router;
