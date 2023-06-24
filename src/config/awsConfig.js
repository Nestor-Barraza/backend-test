
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION } from "utils/constants";
import nodemailer from "nodemailer";
import  sesTransport from "nodemailer-ses-transport";

//AWS Config

const SendEmailClient = nodemailer.createTransport(sesTransport({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: REGION,
}));

export default SendEmailClient;
