const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = async (req, res, next) => {
  const products = (await Product.fetchAll()) || [];
  res.render("shop/product-list", {
    prods: products,
    pageTitle: "All Products",
    path: "/products"
  });
};

exports.getProduct = async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  res.render("shop/product-detail", {
    product,
    pageTitle: product.title,
    path: "/products"
  });
};

exports.getIndex = async (req, res, next) => {
  const products = (await Product.fetchAll()) || [];
  res.render("shop/index", {
    prods: products,
    pageTitle: "Shop",
    path: "/"
  });
};

exports.getCart = async (req, res, next) => {
  const products = await req.user.getCart();
  console.log("productsHere", products);

  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Cart",
    products: products
  });
};

exports.postCart = async (req, res, next) => {
  const { productId } = req.body;
  const product = await Product.findById(productId);
  await req.user.addToCart(product);
  res.redirect("/cart");
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const { productId } = req.body;
  await req.user.deleteItemFromCart(productId);
  res.redirect("/cart");
};

exports.getOrders = async (req, res, next) => {
  const orders = await req.user.getOrders();
  console.log("this is orders", orders);
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Orders",
    orders
  });
};

exports.postOrder = async (req, res, next) => {
  await req.user.addOrder();
  res.redirect("/orders");
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout"
  });
};
