exports.getPosts = (req, res, next) => {
  return res.status(200).json({
    posts: [
      { title: "first post", content: "This is the first content of the post" },
    ],
  });
};
