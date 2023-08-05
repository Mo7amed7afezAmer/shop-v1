const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cors= require("cors");
const cookieParser = require('cookie-parser'); 

const app = express();
const port = 3131;

// Import middleware
const createCookies = require("./middleware/createCookies")

// Import Router
const authRouter = require("./route/authRouter");
const displayPartRouter = require("./route/displayPartRouter");
const departmentRouter = require("./route/control/departmentRouter"); // control
const itemRouter = require("./route/control/itemRouter"); // control
const customerRouter = require("./route/control/customerRouter") // control
const cartRouter = require("./route/control/cartRouter") // control

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

var imgPath = path.join(__dirname, 'imgs');
app.use(express.static(imgPath));
console.log(imgPath);

// routes 
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

// page routes =>
app.use("/auth", [ authRouter, createCookies ]);
app.use("/display", displayPartRouter);
app.use("/department", departmentRouter);
app.use("/item", itemRouter);
app.use("/customer", customerRouter);
app.use("/cart", cartRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

// run server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});