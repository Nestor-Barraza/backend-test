"use strict";

var _express = require("express");
var _Application = require("../Application");
const router = (0, _express.Router)();
//Sign Up
router.post('/sign-up', _Application.signUp);

//Sign In
router.post('/sign-in', _Application.signIn);
module.exports = router;