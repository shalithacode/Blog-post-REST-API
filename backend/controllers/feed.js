const { validationResult } = require("express-validator");

exports.getPosts = (req, res, next) => {
  return res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "first post",
        content: "This is the first content of the post",
        imageUrl: "images/duck.jpg",
        creator: {
          author: "Max",
        },
        createdAt: new Date(),
      },
    ],
  });
};
exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!error.isEmpty())
    return res.status(422).json({
      message: "Validation was failed, Entered data incorrect!",
      errors: errors.array(),
    });

  const title = req.body.title;
  const content = req.body.content;

  res.status(201).json({
    message: "Post was created sucessfuly",
    post: {
      _id: new Date().toISOString(),
      title: title,
      content: content,
      imageUrl: "images/duck.jpg",
      creator: {
        author: "Max",
      },
      createdAt: new Date(),
    },
  });
};
