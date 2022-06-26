const Blog = require("../model/Blog");
const User = require("../model/User");

const postController = {
  postArticle: async (req, res) => {
    try {
      const newBlog = new Blog(req.body);
      const saveBlog = await newBlog.save();

      if (req.body.user) {
        const user = User.findById(req.body.id);
        await user.updateOne({ $push: { blogs: saveBlog._id } });
      }

      res.status(200).json(saveBlog);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },

  getAllArticle: async (req, res) => {
    try {
      const blog = await Blog.find();
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOneArticle: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = postController;
