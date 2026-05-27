const express = require("express");

const cors = require("cors");

const connectDB =
require("./config/db");

const expertRoutes =
require("./routes/expertRoutes");

const userRoutes =
require("./routes/userRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use("/experts",
expertRoutes);

app.use("/users",
userRoutes);

app.listen(5000,()=>{

console.log("Server Running");

});