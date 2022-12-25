const mongoose = require("mongoose")
const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require("cors")

dotenv.config();

//routes
const todoRoute = require("./Routes/todoRoutes");
const authRoute = require("./Routes/auth");

//connect to database
mongoose.connect(process.env.DATABASE_URL, () => console.log("Connected to TodoDatabase"));

//middleware
app.use(cors());
app.use(express.json());
//router middleware
app.use("/api/todo", todoRoute);
app.use("/api", authRoute);

app.listen(`0.0.0.0:$PORT`, () => console.log("live"));