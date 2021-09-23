const fs = require("fs");
const path = require("path");

const location = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const Cart = require("./cart");

module.exports = class Product {
  constructor(id, title, price, description, imageUrl) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
  static fetchAll() {
    const data = fs.readFileSync(location);
    console.log("data", data);
    return data && data.length ? JSON.parse(data) : [];
  }

  static findById(id) {
    const products = this.fetchAll();
    const product = products.find(p => p.id === id);
    return product;
  }

  static async deleteById(id) {
    const products = this.fetchAll();
    const product = this.findById(id);
    const updatedProducts = products.filter(p => p.id !== id);
    const json = updatedProducts;
    fs.writeFileSync(location, JSON.stringify(json));
    Cart.deleteProduct(id, product.price);
  }
  save() {
    let json, writeData;
    if (this.id) {
      // update
      const products = Product.fetchAll();
      const index = products.findIndex(p => p.id === this.id);
      const updatedProducts = [...products];
      updatedProducts[index] = this;
      json = updatedProducts;
      writeData = JSON.stringify(json);
    } else {
      // create
      this.id = Math.random().toString();
      const data = fs.readFileSync(location);
      json = data && data.length ? JSON.parse(data) : [];
      const product = this;
      json.push(product);
      writeData = JSON.stringify(json);
    }
    fs.writeFileSync(location, writeData);
  }
};
