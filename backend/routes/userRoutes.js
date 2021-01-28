const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/count/getCount", userController.getTotalNumbersOfUsers);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
