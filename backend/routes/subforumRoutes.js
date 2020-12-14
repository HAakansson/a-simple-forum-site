const express = require("express");
const router = express.Router();
const subForumController = require("../controllers/subForumController");

router.get("", subForumController.getAllSubforums);

module.exports = router;