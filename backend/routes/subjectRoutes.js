const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");

router.get("", subjectController.getAllSubjects);
router.get("/:subforumId/count", subjectController.getCountOfSubjects);

module.exports = router;
