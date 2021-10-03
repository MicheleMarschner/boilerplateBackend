const router = require('express').Router();
const authController = require('../controller/auth.js');


router
    .get("/logout",authController.logout)
    .post("/login", authController.login)
    .post("/register", authController.register);
    

module.exports = router;    