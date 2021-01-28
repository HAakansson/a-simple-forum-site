const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");

router.get("", subjectController.getAllSubjects);
router.get("/:subjectId", subjectController.getSubjectBySubjectId)
router.get("/:subforumId/count", subjectController.getCountOfSubjects);
router.get("/subforum/:subforumName", subjectController.getAllSubjectsBysubforumId);
router.get("/forum/:forumId", subjectController.getAllSubjectsByForumId);
router.post("", subjectController.postNewSubject);
router.put("/lock/:subjectId", subjectController.lockSubject);
module.exports = router;
