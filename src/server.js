import express from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import CorsAccess from "utils/middlewares/cors";
import { userRouter, enterpriseRouter, productRouter } from "structure";
import "config/database";

//General config
require("dotenv").config();

//initializations
const app = express();
//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(CorsAccess);
//Settings
app.set("port", process.env.PORT || 8000);

//Routes
app.use(userRouter);
app.use(enterpriseRouter);
app.use(productRouter);

module.exports = app;
