const express = require("express");
const errorMiddleware = require("./middleware/error")
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors');
app.use(cors())
app.use(express.json())

app.use(cookieParser())

//Route imports

const product = require("./routes/productRoute")
const user = require("./routes/userRoutes")
const order = require("./routes/orderRoute")

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//Middlewware for error
app.use(errorMiddleware)


module.exports = app;   