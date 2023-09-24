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
  if (!errors.isEmpty())
    return res.status(422).json({
      message: "Validation was failed, Entered data incorrect!",
      errors: errors.array(),
    });

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
    .catch((e) => console.log(e));
};
