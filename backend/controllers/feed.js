const { validationResult } = require("express-validator");
const Post = require("../models/post");
const fs = require("fs");
const path = require("path");
const User = require("../models/user");

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  try {
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find()

      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    return res.status(200).json({
      posts: posts,
      totalItems: totalItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({
      post: post,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
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
  const creator = req.userId;

  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: creator,
  });
  try {
    const fetchedPost = await post.save();

    const fetchedUser = await User.findById(creator);

    fetchedUser.posts.push(post);
    await fetchedUser.save();

    return res.status(201).json({
      message: "Post was created sucessfuly",
      post: fetchedPost,
      creator: { _id: fetchedUser._id, name: fetchedUser.name },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }
    if (post.creator.toString() !== req.userId) {
      const error = new Error("Not Authorized!");
      error.statusCode = 403;
      throw error;
    }
    clearImage(post.imageUrl);
    await Post.findByIdAndRemove(postId);

    const user = await User.findById(req.userId);

    user.posts.pull(postId);
    await user.save();

    return res.status(200).json({ massage: "The post was deleted!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editPost = async (req, res, next) => {
  const postId = req.params.postId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;

  if (req.file) {
    imageUrl = req.file.path.replace("\\", "/");
  }
  if (!imageUrl) {
    const error = new Error("No file picked.");
    error.statusCode = 422;
    throw error;
  }
  try {
    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }
    if (post.imageUrl !== imageUrl) {
      clearImage(post.imageUrl);
    }
    if (post.creator.toString() !== req.userId) {
      const error = new Error("Not Authorized!");
      error.statusCode = 403;
      throw error;
    }

    post.title = title;
    post.content = content;
    post.imageUrl = imageUrl;
    const editedPost = await post.save();

    return res.status(200).json({ message: "post updated!", post: editedPost });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
