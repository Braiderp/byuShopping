const express = require("express");
const router = express.Router();

const products = [];

router.post("/add-product", (req, res, next) => {
  const { title, price, description } = req.body;
  products.push({ title, price, description });
  console.log("req.body", req.body);
  res.redirect("/");
});

router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product"
  });
});

exports.routes = router;
exports.products = products;
