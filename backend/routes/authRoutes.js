const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/register", authController.registerUser);
router.get("/whoami", authController.whoami);
router.get("/logout", authController.logout);

module.exports = router;
