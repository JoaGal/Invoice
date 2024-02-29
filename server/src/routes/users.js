const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticate");
const { registerUser, loginUser, getUser } = require("../controllers/users");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/get", authenticateToken, getUser);

module.exports = router;
