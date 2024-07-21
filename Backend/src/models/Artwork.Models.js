import mongoose from "mongoose";

const addProductSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    forSale: {
        type: String,
        default: false,
    },
});

const Artworks = mongoose.model("Artworks", addProductSchema);

export default Artworks;
