const userController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = require("express").Router();

router.get("/", authMiddleware.verifyToken, userController.getAllUser);

module.exports = router;
