const Post = require("../../models/Post");
module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = Post.find({});
        return posts;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
