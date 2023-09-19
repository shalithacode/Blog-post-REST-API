const express = require("express");
const router = express.Router();
const feedCotroller = require("../controllers/feed");

router.get("/posts", feedCotroller.getPosts);

module.exports = router;
