import mongoose from "mongoose";
import { CLUSTER_URL } from "utils/constants";
import "colors";
require("dotenv").config();

const databaseConnect = async () => {
  try {
    await mongoose.connect(CLUSTER_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successful database connection".white, "Mr.Robot".red);
  } catch (error) {
    console.log(error);
  }
};

databaseConnect();
