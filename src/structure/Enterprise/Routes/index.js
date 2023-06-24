import { Router } from "express";
import { isAuthenticated } from "helpers/auth";
import {
  createNewEnterprise,
  renderEnterprise,
  findEnterprise,
  updateEnterprise,
  deleteEnterprise,
} from "../Application";

const router = Router();

//Render enterprise
router.get("/enterprise/", isAuthenticated, renderEnterprise);
//Find enterprise
router.get("/enterprise/:NIT", isAuthenticated, findEnterprise);
//New enterprise
router.post("/enterprise/create", isAuthenticated, createNewEnterprise);
//Edit enterprise
router.put("/enterprise/update", isAuthenticated, updateEnterprise);
//Delete enterprise
router.delete("/enterprise/delete/:NIT", isAuthenticated, deleteEnterprise);

module.exports = router;
