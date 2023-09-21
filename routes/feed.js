const express = require("express");
const router = express.Router();
const feedCotroller = require("../controllers/feed");

router.get("/posts", feedCotroller.getPosts);

router.post("/post", feedCotroller.createPost);

module.exports = router;
