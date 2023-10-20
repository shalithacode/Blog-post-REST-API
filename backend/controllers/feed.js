const { validationResult } = require("express-validator");
const Post = require("../models/post");
exports.getPosts = (req, res, next) => {
  Post.find()
    .then((result) => {
      return res.status(200).json({
        posts: result,
      });
    })
    .catch((e) => console.log(e));
};
exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const imageUrl = "images/duck.jpg";
  const content = req.body.content;
  const creator = { author: "Max" };

  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: creator,
  });
  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Post was created sucessfuly",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
