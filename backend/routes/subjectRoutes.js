const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");

router.get("", subjectController.getAllSubjects);
router.get("/:subjectId", subjectController.getSubjectBySubjectId)
router.get("/:subforumId/count", subjectController.getCountOfSubjects);
router.get("/subforum/:subforumName", subjectController.getAllSubjectsBysubforumId);
router.post("", subjectController.postNewSubject);
module.exports = router;
