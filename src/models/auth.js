const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        uid: { type: String, required: true, trim: true, unique: true },
        fullName: { type: String, required: true, trim: true, min: 3 },
        email: { type: String, required: true, trim: true, unique: true },
        password: { type: String, required: true, trim: true, min: 6 },
        status: { type: [String], required: true, trim: true, enum: ["Active", "In Active"], default: "Active" },
        role: { type: [String], required: true, trim: true, enum: ["Super Admin", "Seller", "Customer"], default: "Customer" }
    },
    { timestamps: true }
)

const Users = mongoose.model("Users", userSchema);

module.exports = { Users };
