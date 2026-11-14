const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../models/auth");
const { getRandomId } = require("../utils/global");

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

module.exports = router;
