// backend/app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// mock routers
app.use("/analyze", require("./routes/analyze"));
app.use("/task", require("./routes/task"));

app.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});