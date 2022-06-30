const postController = require("../controller/blogController");
const authMiddleware = require("../middleware/authMiddleware");
const router = require("express").Router();

router.get("/:id", postController.getOneArticle);
router.post("/:id", postController.updateArticle);
router.post("/", postController.postArticle);
router.get("/", postController.getAllArticle);

module.exports = router;
