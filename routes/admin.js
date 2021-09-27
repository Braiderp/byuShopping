const express = require("express");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

const adminController = require("../controllers/admin");

const {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct
} = adminController;

router.get("/products", isAuth, getProducts);

router.post("/add-product", isAuth, postAddProduct);

router.get("/add-product", isAuth, getAddProduct);

router.get("/edit-product/:productId", isAuth, getEditProduct);

router.post("/edit-product", isAuth, postEditProduct);

router.post("/delete-product", isAuth, postDeleteProduct);

module.exports = router;
