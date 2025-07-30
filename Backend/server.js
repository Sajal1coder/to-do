const express=require("express")
const dotenv =require("dotenv")
const cors =require("cors")
const mongoose = require("mongoose");
const app = express();
const connectDB = require("./config/db");
const authRoute=require("./routes/authRoute");
const todoRoute=require("./routes/todoRoute");
dotenv.config();
app.use(cors());
connectDB();
app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/todo",todoRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
