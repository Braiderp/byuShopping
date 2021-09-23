const fs = require("fs");
const path = require("path");
const location = path.join(
  path.dirname(require.main.filename),
  "data",
  "cart.json"
);
const defaultCart = { products: [], totalPrice: 0 };

module.exports = class Cart {
  static async addProduct(id, productPrice) {
    const data = fs.readFileSync(location);
    const cart = data && data.length ? JSON.parse(data) : defaultCart;
    const index = cart.products.findIndex(product => product.id === id);
    const existingProduct = cart.products[index];
    let updatedProduct;
    if (existingProduct) {
      updatedProduct = { ...existingProduct };
      updatedProduct.qty = updatedProduct.qty + 1;
      cart.products = [...cart.products];
      cart.products[index] = updatedProduct;
    } else {
      updatedProduct = { id, qty: 1 };
      cart.products = [...cart.products, updatedProduct];
    }
    cart.totalPrice += Number(productPrice);
    const json = JSON.stringify(cart);
    fs.writeFileSync(location, json);
  }
  static async deleteProduct(id, price) {
    const data = fs.readFileSync(location);
    const cart = data && data.length ? JSON.parse(data) : defaultCart;
    const product = cart.products.find(prod => prod.id === id);
    console.log("productFound", product);
    if (product) {
      const { qty } = product;
      console.log({ products: cart.products, id });

      cart.products = cart.products.filter(p => p.id !== id);
      cart.totalPrice = cart.totalPrice - price * qty;
      const json = JSON.stringify(cart);
      console.log(json);
      fs.writeFileSync(location, json);
    }
  }
  static getCart() {
    const data = fs.readFileSync(location);
    const cart = data && data.length ? JSON.parse(data) : defaultCart;
    return cart;
  }
};
