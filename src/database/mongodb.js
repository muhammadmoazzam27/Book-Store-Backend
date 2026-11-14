const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URL

const connectDB = () => {

    mongoose.connect(`${MONGODB_URI}`)

        .then(() => {
            console.log("MongoDB successfully connected")
        })
        .catch((error) => {
            console.log("MongoDB connection failed : ", error)
        })

}

module.exports = { connectDB };
