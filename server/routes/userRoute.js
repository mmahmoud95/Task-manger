const express = require("express");
var router = express.Router();

const { register, login, logOut } = require("../controller/userController");


router.post('/login', login);
router.post("/register", register);
router.post("/logout", logOut);


module.exports = router;