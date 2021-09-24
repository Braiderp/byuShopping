let db;
const mongoConnect = callback => {
  const { MongoClient } = require("mongodb");
  const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@web-development-2.cglha.mongodb.net/shop?retryWrites=true&w=majority`;
  MongoClient.connect(uri)
    .then(client => {
      console.log("connected");
      db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};

const getDb = () => {
  if (db) {
    return db;
  } else {
    throw "NO DB FOUND!";
  }
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
