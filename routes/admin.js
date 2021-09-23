const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");

const {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct
} = adminController;

router.get("/products", getProducts);

router.post("/add-product", postAddProduct);

router.get("/add-product", getAddProduct);

router.get("/edit-product/:productId", getEditProduct);

router.post("/edit-product", postEditProduct);

router.post("/delete-product", postDeleteProduct);

module.exports = router;
