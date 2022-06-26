const postController = require("../controller/blogController");
const authMiddleware = require("../middleware/authMiddleware");
const router = require("express").Router();

router.post("/", postController.postArticle);
router.get("/", postController.getAllArticle);
router.get("/:id", postController.getOneArticle);

module.exports = router;
