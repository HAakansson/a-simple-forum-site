const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/:subforumId/count", postController.getCountOfPosts)
router.get("/count/getCount", postController.getTotalNumberOfPosts);

module.exports = router;
