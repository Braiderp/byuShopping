const fs = require("fs");
const path = require("path");

const { Schema, model } = require("mongoose");

const { ObjectId } = Schema.Types;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = model("Product", productSchema);

// module.exports = class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new ObjectId(id) : null;
//     this.userId = userId ? new ObjectId(id) : null;
//   }
//   static async fetchAll() {
//     const db = getDb();
//     return await db.collection("products").find().toArray();
//   }

//   static async findById(id) {
//     const db = getDb();
//     return await db
//       .collection("products")
//       .find({ _id: new ObjectId(id) })
//       .next();
//   }

//   static async deleteById(id) {
//     const db = getDb();
//     return await db.collection("products").deleteOne({ _id: new ObjectId(id) });
//     // const products = await this.fetchAll();
//     // const product = await this.findById(id);
//     // const updatedProducts = products.filter(p => p.id !== id);
//     // const json = updatedProducts;
//     // fs.writeFileSync(location, JSON.stringify(json));
//     // Cart.deleteProduct(id, product.price);
//   }
//   save() {
//     let dbOp;
//     const db = getDb();
//     if (this._id) {
//       console.log("THIS", this);
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp;
//   }
// };
