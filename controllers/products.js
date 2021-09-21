const Product = require("../models/product");

exports.postAddProduct = (req, res, next) => {
  const { title, price, description } = req.body;
  const product = new Product(title, price, description);
  product.save();
  console.log("req.body", req.body);
  res.redirect("/");
};

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product"
  });
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll() || [];
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCss: true
  });
};
