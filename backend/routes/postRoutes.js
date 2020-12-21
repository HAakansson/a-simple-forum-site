const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/getTotalCount", postController.getTotalNumberOfPosts);
router.get("/subforum/:subforumId/getTotalCount", postController.getCountOfPostsBySubforumId)
router.get("/subforum/:subforumName", postController.getAllPostsBySubforumName);
router.get("/subject/:subjectId", postController.getAllPostsBySubjectId);

module.exports = router;
