const express = require("express");

const router = express.Router();

const products = require("./admin").products;

router.get("/", (req, res, next) => {
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCss: true
  });
});

module.exports = router;
