const authController = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = require("express").Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/refresh", authController.requestRefreshToken);
router.post("/logout", authMiddleware.verifyToken, authController.logOutUser);

module.exports = router;
