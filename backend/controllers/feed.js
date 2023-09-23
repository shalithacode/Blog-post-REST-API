exports.getPosts = (req, res, next) => {
  return res.status(200).json({
    posts: [
      { title: "first post", content: "This is the first content of the post" },
    ],
  });
};
exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  res.status(201).json({
    message: "Post was created sucessfuly",
    post: {
      id: new Date().toISOString(),
      title: title,
      content: content,
    },
  });
};
