const jwt = require("jsonwebtoken");

const verfiyToken = async (req, res, next) => {

    try {

        const authHeader = req?.headers?.authorization

        if (!authHeader) {
            return res.status(404).json({ message: "Token not found", success: false, isError: true })
        }

        const token = authHeader.split(" ")[1]

        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (!decoded) {
            return res.status(401).json({ message: "Invalid Token & Un-Authorized user" })
        }

        req.uid = decoded.uid;

        next();

    }
    catch (error) {
        console.error("Error => ", error);
        return res.status(500).json({ message: "Something went wrong", success: false, isError: true })
    }

}

module.exports = { verfiyToken };
