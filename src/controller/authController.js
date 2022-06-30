const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let listRefreshToken = [];
const authController = {
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        phoneNumber: req.body.phoneNumber,
        password: hashed,
        gender: req.body.gender,
      });

      const user = await newUser.save();
      res.status(200).json({ message: "Create account success", user });
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(500)
          .json({ message: "username, phone number or email exists" });
      }
      res.status(500).json({ message: error.message });
    }
  },

  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "20m" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: "User not exists !!!" });
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(404).json({ message: "Invalid password" });
      }

      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        listRefreshToken.push(refreshToken);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict", // ngăn chặn csrf
        });

        const { password, ...others } = user._doc; // bỏ password ra kh trả về password
        res
          .status(200)
          .json({ message: "login success", user: { ...others }, accessToken });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json("You're not authenticated");
    }

    if (!listRefreshToken.includes(refreshToken)) {
      return res.status(403).json("Refresh Token is not valid");
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }

      listRefreshToken = listRefreshToken.filter(
        (token) => token !== refreshToken
      );

      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      listRefreshToken.push(newRefreshToken);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  },

  logOutUser: async (req, res) => {
    res.clearCookie("refreshToken");
    listRefreshToken = listRefreshToken.filter(
      (token) => token !== req.cookies.refreshToken
    );

    res.status(200).json("Logged out successfully!");
  },
};

module.exports = authController;
