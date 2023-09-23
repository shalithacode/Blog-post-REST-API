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
