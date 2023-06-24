import { Router } from "express";
import { isAuthenticated } from "helpers/auth";
import {
  getPdf,
  sendPdf,
  createNewproduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../Application";

const router = Router();

//New Product
router.post("/product/", isAuthenticated, createNewproduct);
//Get product user
router.get("/product/:id", isAuthenticated, getProduct);
//Edit Product user
router.put("/product/update", isAuthenticated, updateProduct);
//Delete Product user
router.delete("/product/:id", isAuthenticated, deleteProduct);

//Get pdf file
router.get("/get-pdf/:name_file", isAuthenticated, getPdf);
//Send pdf file
router.post("/send-pdf/", isAuthenticated, sendPdf);

module.exports = router;
