const Product = require("../models/product");

exports.postAddProduct = async (req, res, next) => {
  const { title, price, description, imageUrl } = req.body;
  console.log("ID ///////////", req.user._id);
  const product = await new Product({
    title,
    price,
    description,
    imageUrl,
    userId: req.user
  });

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

exports.getEditProduct = async (req, res, next) => {
  const editMode = Boolean(req.query.edit);
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (
    !editMode ||
    !product ||
    product.userId.toString() !== req.user._id.toString()
  ) {
    return res.redirect("/");
  }
  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: editMode,
    product
  });
};

exports.postEditProduct = async (req, res, next) => {
  const { productId, title, imageUrl, description, price } = req.body;
  const product = await Product.findById(productId);
  product.title = title;
  product.imageUrl = imageUrl;
  product.description = description;
  product.price = price;
  product.save();
  res.redirect("/admin/products");
};

exports.getProducts = async (req, res, next) => {
  const products = (await Product.find({ userId: req.user._id })) || [];
  console.log("products", products);
  res.render("admin/products", {
    prods: products,
    pageTitle: "admin products",
    path: "/admin/products"
  });
};

exports.postDeleteProduct = async (req, res, next) => {
  const { productId } = req.body;
  await Product.deleteOne({ _id: productId, userId: req.user._id });
  res.redirect("/admin/products");
};
