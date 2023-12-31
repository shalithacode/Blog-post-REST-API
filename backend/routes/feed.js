const express = require("express");
const router = express.Router();
const feedCotroller = require("../controllers/feed");
const { body } = require("express-validator");

router.get("/posts", feedCotroller.getPosts);

router.post(
  "/post",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedCotroller.createPost
);

router.get("/post/:postId", feedCotroller.getPost);
module.exports = router;
