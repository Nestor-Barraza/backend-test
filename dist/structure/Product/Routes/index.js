"use strict";

var _express = require("express");
var _auth = require("../../../helpers/auth");
var _Application = require("../Application");
const router = (0, _express.Router)();

//New Product
router.post("/product/", _auth.isAuthenticated, _Application.createNewproduct);
//Get product user
router.get("/product/:id", _auth.isAuthenticated, _Application.getProduct);
//Edit Product user
router.put("/product/update", _auth.isAuthenticated, _Application.updateProduct);
//Delete Product user
router.delete("/product/:id", _auth.isAuthenticated, _Application.deleteProduct);

//Get pdf file
router.get("/get-pdf/:name_file", _auth.isAuthenticated, _Application.getPdf);
//Send pdf file
router.post("/send-pdf/", _auth.isAuthenticated, _Application.sendPdf);
module.exports = router;