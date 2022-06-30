const mongoose = require("mongoose");

const BlogScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  created_at: {
    type: String,
    default: new Date().toLocaleDateString("en-Us"),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId || String,
    ref: "User",
    required: true,
  },
});

const Blog = mongoose.model("Blog", BlogScheme);
module.exports = Blog;
