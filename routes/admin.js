const express = require("express");

const router = express.Router();

const productsController = require("../controllers/products");

const { getAddProduct, postAddProduct } = productsController;

router.post("/add-product", postAddProduct);

router.get("/add-product", getAddProduct);

module.exports = router;
