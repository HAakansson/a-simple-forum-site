const express = require("express");
const router = express.Router();
const subForumController = require("../controllers/subForumController");

router.get("", subForumController.getAllSubforums);
router.get("/moderators/:subforumName", subForumController.getModeratorsForSubforum)
router.post("/new-moderator", subForumController.addNewModerator)
router.post("/remove-moderator", subForumController.removeModerator);
router.put("/update-moderator", subForumController.changeRoleOnUsers);

module.exports = router;