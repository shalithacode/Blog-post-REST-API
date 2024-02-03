const express = require("express");
const router = express.Router();
const feedCotroller = require("../controllers/feed");
const { body } = require("express-validator");
const isAuth = require("../middleware/is-auth");

router.get("/posts", isAuth, feedCotroller.getPosts);

router.post(
  "/post",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedCotroller.createPost
);

router.get("/post/:postId", isAuth, feedCotroller.getPost);
router.put(
  "/post/:postId",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedCotroller.editPost
);

router.delete("/post/:postId", isAuth, feedCotroller.deletePost);
module.exports = router;
