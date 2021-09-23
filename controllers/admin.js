const Product = require("../models/product");

exports.postAddProduct = (req, res, next) => {
  const { title, price, description, imageUrl } = req.body;
  const product = new Product(null, title, price, description, imageUrl);
  product.save();
  console.log("req.body", req.body);
  res.redirect("/");
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    product: null
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = Boolean(req.query.edit);
  const { productId } = req.params;
  const product = Product.findById(productId);
  if (!editMode || !product) {
    return res.redirect("/");
  }
  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: editMode,
    product
  });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, description, price } = req.body;
  const product = new Product(productId, title, price, description, imageUrl);
  product.save();
  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll() || [];
  res.render("admin/products", {
    prods: products,
    pageTitle: "admin products",
    path: "/admin/products"
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.deleteById(productId);
  res.redirect("/admin/products");
};
