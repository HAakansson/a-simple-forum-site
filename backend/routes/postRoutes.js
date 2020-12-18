const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/getTotalCount", postController.getTotalNumberOfPosts);
router.get("/subforum/:subforumId/getTotalCount", postController.getCountOfPostsBySubforumId)
router.get("/subject/:subjectId", postController.getPostsBySubjectId);

module.exports = router;
