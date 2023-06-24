"use strict";

var _express = require("express");
var _auth = require("../../../helpers/auth");
var _Application = require("../Application");
const router = (0, _express.Router)();

//Render enterprise
router.get("/enterprise/", _auth.isAuthenticated, _Application.renderEnterprise);
//Find enterprise
router.get("/enterprise/:NIT", _auth.isAuthenticated, _Application.findEnterprise);
//New enterprise
router.post("/enterprise/create", _auth.isAuthenticated, _Application.createNewEnterprise);
//Edit enterprise
router.put("/enterprise/update", _auth.isAuthenticated, _Application.updateEnterprise);
//Delete enterprise
router.delete("/enterprise/delete/:NIT", _auth.isAuthenticated, _Application.deleteEnterprise);
module.exports = router;