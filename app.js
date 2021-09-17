const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin").routes;

const products = require("./routes/admin").products;

const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/admin", adminRoutes);
app.use("/", shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found!", path: null });
});

app.listen(3000);
