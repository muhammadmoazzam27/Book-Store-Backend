require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/database/mongodb");
const auth = require("./src/routes/auth");

const app = express();

const PORT = process.env.PORT || 8000

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

connectDB();

app.use("/api/auth", auth);

app.get("/", (req, res) => {
    res.send(`A server is running on PORT ${PORT}`)
})

app.get("/health", (req, res) => {
    res.send("A server health is good")
})

app.listen(PORT, (req, res) => {
    console.log(`A server is running on PORT ${PORT}`)
})
