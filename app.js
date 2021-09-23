const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

const bodyParser = require("body-parser");

const { get404Page } = require("./controllers/error");

const adminRoutes = require("./routes/admin");

const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/admin", adminRoutes);
app.use("/", shopRoutes);

app.use(get404Page);

app.listen(3000);
