const mongoose = require("mongoose");

const { Schema } = mongoose;

const productShema = new Schema(
    {
        seller_uid: { type: String, required: true, trim: true },
        id: { type: String, required: true, trim: true, unique: true },
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true, trim: true },
        price: { type: Number, required: true, trim: true },
        stock: { type: Number, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        imageUrl: { type: String, required: true, trim: true },
        publicId: { type: String, required: true, trim: true }
    },
    {
        timestamps: true
    }
)

const Products = mongoose.model("products", productShema);

module.exports = { Products };
