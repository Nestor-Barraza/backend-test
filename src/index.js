import DefaultTemplate from "utils/defaultTemplate";
import app from "./server";
import "colors";

// Get port
const PORT = app.get("port");
// Server message
app.use("/", (req, res) => {
  res.send(DefaultTemplate(PORT));
});

// Start server
app.listen(PORT, () => {
  try {
    console.log("Listen on port:".blue, `${PORT}`.rainbow.underline);

  } catch (error) {
    console.log(error);
  }
});