const { validationResult } = require("express-validator");
const Post = require("../models/post");
exports.getPosts = (req, res, next) => {
  Post.find()
    .then((result) => {
      if (!result) {
        const error = new Error("Could not find posts.");
        error.statusCode = 404;
        throw error;
      }
      return res.status(200).json({
        posts: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((result) => {
      if (!result) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      return res.status(200).json({
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

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const imageUrl = req.file.path.replace("\\", "/");
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
