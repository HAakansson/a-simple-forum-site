const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forumController");

router.get("", forumController.getAllForums);

module.exports = router;