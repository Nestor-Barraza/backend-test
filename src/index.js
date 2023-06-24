import DefaultTemplate from "utils/defaultTemplate";
import app from "./server";
import https from "https";
import selfsigned from "selfsigned";
import "colors";

// Get port
const PORT = app.get("port");

// Generate a self-signed certificate and key
const attrs = [{ name: "commonName", value: "localhost" }];
const pems = selfsigned.generate(attrs, {
  keySize: 2048,
  algorithm: "sha256",
});

// Create options for the HTTPS server
const options = {
  key: pems.private,
  cert: pems.cert,
};
// Server message
app.use("/", (req, res) => {
  res.send(DefaultTemplate(PORT));
});

// Listen for incoming HTTPS requests
https.createServer(options, app).listen(PORT, () => {
  try {
    console.log("Listen on port:".blue, `${PORT}`.rainbow.underline);
   
  } catch (error) {
    console.log(error);
  }
});
