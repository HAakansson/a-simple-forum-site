const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

router.get("/users", apiController.getAllUsers);
router.get("/users/:id", apiController.getUserById);
router.post("/users", apiController.createUser);
router.put("/users/:id", apiController.updateUser);
router.delete("/users/:id", apiController.deleteUser);

module.exports = router;
