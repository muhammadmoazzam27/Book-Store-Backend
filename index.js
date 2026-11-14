const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const PORT = dotenv.PORT || 8000

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send(`A server is running on PORT ${PORT}`)
})

app.get("/health", (req,res)=>{
    res.send("A server health is good")
})

app.listen(PORT, (req,res)=>{
    console.log(`A server is running on PORT ${PORT}`)
})
