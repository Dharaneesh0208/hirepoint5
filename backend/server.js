const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();
console.log(process.env.MONGO_URI);
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/experts", require("./routes/expertRoutes"));

app.get("/", (req, res) => {
  res.send("HirePoint API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});