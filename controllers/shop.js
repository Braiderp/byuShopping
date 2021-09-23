const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll() || [];
  res.render("shop/product-list", {
    prods: products,
    pageTitle: "All Products",
    path: "/products"
  });
};

exports.getProduct = async (req, res, next) => {
  const { productId } = req.params;
  const product = Product.findById(productId);
  res.render("shop/product-detail", {
    product,
    pageTitle: product.title,
    path: "/products"
  });
};

exports.getIndex = (req, res, next) => {
  const products = Product.fetchAll() || [];
  res.render("shop/index", {
    prods: products,
    pageTitle: "Shop",
    path: "/"
  });
};

exports.getCart = async (req, res, next) => {
  const cart = Cart.getCart();
  const products = Product.fetchAll();
  const cartProducts = [];

  for (product of products) {
    const cartProductData = cart.products.find(prod => prod.id === product.id);
    if (cartProductData) {
      cartProducts.push({ productData: product, qty: cartProductData.qty });
    }
  }

  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Cart",
    products: cartProducts
  });
};

exports.postCart = async (req, res, next) => {
  const { productId } = req.body;
  const { price } = Product.findById(productId);
  Cart.addProduct(productId, price);
  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  const { price } = Product.findById(productId);
  Cart.deleteProduct(productId, price);
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Orders"
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout"
  });
};
