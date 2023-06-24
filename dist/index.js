"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _defaultTemplate = _interopRequireDefault(require("./utils/defaultTemplate"));
var _server = _interopRequireDefault(require("./server"));
var _express = _interopRequireDefault(require("express"));
var _https = _interopRequireDefault(require("https"));
var _fs = _interopRequireDefault(require("fs"));
require("colors");
// Get port
const PORT = _server.default.get("port");
const options = {
  key: _fs.default.readFileSync("key.pem"),
  cert: _fs.default.readFileSync("cert.pem")
};

//listen server
_https.default.createServer(options, _server.default).listen(PORT, () => {
  try {
    console.log("Listen on port:".blue, `${PORT}`.rainbow.underline);
    _server.default.use("/", (req, res) => {
      res.send((0, _defaultTemplate.default)(PORT));
    });
  } catch (error) {
    console.log(error);
  }
});