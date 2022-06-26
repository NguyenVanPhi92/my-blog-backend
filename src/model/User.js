const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 50,
      unique: true,
    },

    dateOfBirth: {
      type: String,
    },

    gender: {
      type: String,
    },

    phoneNumber: {
      type: String,
      required: true,
      maxlength: 11,
      minlength: 9,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 80,
    },

    admin: {
      type: Boolean,
      default: false,
    },
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
