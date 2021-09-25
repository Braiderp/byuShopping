const { Schema, model } = require("mongoose");

const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: {
          type: ObjectId,
          ref: "Product",
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

userSchema.methods.addToCart = async function (product) {
  try {
    console.log("hit");
    const index = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });
    console.log("index", index);
    const updatedCartItems = [...this.cart.items];
    let newQty = 1;
    if (index >= 0) {
      newQty = this.cart.items[index].quantity + 1;
      updatedCartItems[index].quantity = newQty;
    } else {
      updatedCartItems.push({
        productId: product._id,
        quantity: newQty
      });
    }
    console.log("cart", this.cart);
    const updatedCart = {
      items: updatedCartItems
    };
    this.cart = updatedCart;
    console.log("updatedCart", updatedCart);
    return this.save();
  } catch (err) {
    console.error(err);
  }
};

userSchema.methods.deleteItemFromCart = async function (productId) {
  try {
    const updatedCartItems = this.cart.items.filter(item => {
      return item.productId.toString() !== productId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
  } catch (e) {
    console.error(e);
  }
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = model("User", userSchema);
// module.exports = class User {
//   constructor(username, email, cart, id) {
//     this.username = username;
//     this.email = email;
//     this.cart = cart ? cart : { items: [], quantity: 0 };
//     this._id = id ? new ObjectId(id) : null;
//   }
//   save() {
//     try {
//       const db = getDb();
//       return db.collection("users").insertOne(this);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async addToCart(product) {
//     try {
//       const index = this.cart.items.findIndex(cp => {
//         return cp.productId.toString() === product._id.toString();
//       });
//       const updatedCartItems = [...this.cart.items];
//       let newQty = 1;
//       if (index >= 0) {
//         newQty = this.cart.items[index].quantity + 1;
//         updatedCartItems[index].quantity = newQty;
//       } else {
//         updatedCartItems.push({
//           productId: new ObjectId(product._id),
//           quantity: newQty
//         });
//       }

//       const updatedCart = {
//         items: updatedCartItems
//       };
//       const db = getDb();
//       return await db
//         .collection("users")
//         .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async getCart() {
//     try {
//       const db = getDb();
//       const productIds = this.cart.items.map(i => i.productId);
//       const productsIn = await db
//         .collection("products")
//         .find({ _id: { $in: productIds } })
//         .toArray();
//       return productsIn.map(p => {
//         return {
//           ...p,
//           quantity: this.cart.items.find(i => {
//             return i.productId.toString() === p._id.toString();
//           }).quantity
//         };
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async deleteItemFromCart(id) {
//     try {
//       const updatedCartItems = this.cart.items.filter(
//         i => i.productId.toString() !== id.toString()
//       );
//       const db = getDb();
//       return await db
//         .collection("users")
//         .updateOne(
//           { _id: this._id },
//           { $set: { cart: { items: updatedCartItems } } }
//         );
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async addOrder() {
//     try {
//       const db = getDb();
//       const products = await this.getCart();

//       const order = {
//         items: products,
//         user: {
//           _id: this._id,
//           username: this.username
//         }
//       };
//       await db.collection("orders").insertOne(order);
//       this.cart = { items: [] };
//       return await db
//         .collection("users")
//         .updateOne({ _id: this._id }, { $set: { cart: { items: [] } } });
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async getOrders() {
//     try {
//       const db = getDb();
//       return await db
//         .collection("orders")
//         .find({ "user._id": new ObjectId(this._id) })
//         .toArray();
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   static findById(userId) {
//     const db = getDb();
//     return db
//       .collection("users")
//       .findOne({ _id: new ObjectId(userId) })
//       .then(user => {
//         console.log(user);
//         return user;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// };
