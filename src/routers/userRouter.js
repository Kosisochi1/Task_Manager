const express = require("express");
const { register, login, logout } = require("../controllers/user");
const { validateUser } = require("../validations/userValidation");

const router = express.Router();

router.post("/register", validateUser, register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
