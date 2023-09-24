const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const MONGODB_URI = `mongodb+srv://${process.env.MONOGDB_USER}:${process.env.MONOGDB_PASSWORD}@node-cluster.dkal6pa.mongodb.net/blog?retryWrites=true&w=majority`;

const app = express();
app.use(express.static(path.join(__dirname, "images")));
app.use(bodyParser.json());

const feedRoutes = require("./routes/feed");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(8080);
  })
  .catch((e) => console.log(e));
