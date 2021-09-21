const express = require("express");

const router = express.Router();

const productsController = require("../controllers/products");

const { getProducts } = productsController;

router.get("/", getProducts);

module.exports = router;
