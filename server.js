//install:
//npm i express morgan nodemon ejs body-parser dotenv mongoose axios

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
// const bodyparser = require('body-parser')

const globalErrorHandler = require("./server/controller/error-controller");

const connectDB = require("./server/database/connection");

const app = express();

dotenv.config({ path: "config.env" });

const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan("tiny"));

//mongodb connection
connectDB();

//parse request to body parser
app.use(express.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");
//app.set('views',path.resolve(__dirname,"views/ejs"))

//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

//load routers
app.use("/", require("./server/routes/router"));

// global error controller
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
