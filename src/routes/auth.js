const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../models/auth");
const { getRandomId } = require("../utils/global");
const { verfiyToken } = require("../middlewares/authentication");

const router = express.Router();

router.post("/register", async (req, res) => {

    try {

        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false, isError: true })
        }

        const userFound = await Users.findOne({ email });

        if (userFound) {
            return res.status(403).json({ message: "A user already exist", success: false, isError: true })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const uid = getRandomId();

        const userData = { uid, fullName, email, password: hashPassword };

        const user = await Users.create(userData);

        await user.save();

        return res.status(201).json({ message: "A user successfully registered", user, success: true, isError: false })

    }
    catch (error) {
        console.error("Error => ", error);
        return res.status(500).json({ message: "Something went wrong", success: false, isError: true })
    }

})

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Invalid email or password", isError: true, success: false })
        }

        const status = user.status;

        if (status === "In Active") {
            return res.status(401).json({ message: "Your status is not active", isError: true, success: false })
        }

        const correctPassword = await bcrypt.compare(password, user.password)

        if (correctPassword) {

            const uid = user.uid;

            const token = await jwt.sign({ uid }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: "1h" })

            return res.status(200).json({ message: "login successful", token, success: true, isError: false })

        }

        return res.status(401).json({ message: "Invalid email or password", isError: true, success: false })

    }
    catch (error) {
        console.error("Error => ", error);
        return res.status(500).json({ message: "Something went wrong", success: false, isError: true })
    }

})

router.get("/user", verfiyToken, async (req, res) => {

    try {

        const uid = req.uid;

        const user = await Users.findOne({ uid }).select("-password").exec();

        if (!user) {
            return res.status(404).json({ message: "Invalid email or password", success: false, isError: true })
        }

        return res.status(200).json({ message: "login successful", user, isError: false, success: true })

    }
    catch (error) {
        console.error("Error => ", error);
        return res.status(500).json({ message: "Something went wrong", success: false, isError: true })
    }

})

module.exports = router;
