const fs = require("fs");
const path = require("path");

const location = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

module.exports = class Product {
  constructor(title, price, description) {
    this.title = title;
    this.price = price;
    this.description = description;
  }

  save() {
    const data = fs.readFileSync(location);
    const json = data && data.length ? JSON.parse(data) : [];
    const product = this;
    json.push(product);
    const writeData = JSON.stringify(json);
    fs.writeFileSync(location, writeData);
  }

  static fetchAll() {
    const data = fs.readFileSync(location);
    console.log("data", data);
    return data && data.length ? JSON.parse(data) : [];
  }
};
