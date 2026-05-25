import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image1: {
        type: String,
        required: true
    },
    image2: {
        type: String
    },
    image3: {
        type: String
    },
    image4: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    exchange_rate: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    sizes: {
        type: [
            {
                size: {
                    type: String,
                    required: true,
                    trim: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 0,
                    default: 0
                }
            }
        ],
        validate: {
            validator: function(value) {
                const unique = new Set(value.map(v => v.size));
                return unique.size === value.length;
            },
            message: "Duplicate sizes are not allowed"
        }
    },
    stock: {
        type: Number,
        default: 0
    },
    tags: {
        type: Array,
        default: []
    },
    variations: [{
        type: Object
    }],
    market_baseline: {
        type: Number
    },
    date: {
        type: Number,
        required: true
    },
    bestseller: {
        type: Boolean
    }

}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)

export default Product