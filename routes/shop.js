const express = require("express");

const router = express.Router();

const shopController = require("../controllers/shop");

const {
  getIndex,
  getProducts,
  getCart,
  getCheckout,
  getOrders,
  getProduct,
  postCart,
  postCartDeleteProduct
} = shopController;

router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/products/:productId", getProduct);

router.get("/cart", getCart);

router.post("/cart", postCart);

router.post("/cart-delete-item", postCartDeleteProduct);

router.get("/checkout", getCheckout);

router.get("/orders", getOrders);

module.exports = router;
