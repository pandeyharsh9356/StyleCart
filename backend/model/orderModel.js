import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        required: true
    },
    payment: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Number,
        required: true
    },
    promoCode: {
        type: String,
        default: ''
    },
    discount: {
        type: Number,
        default: 0
    },
    paymentId: {
        type: String,
        default: ''
    }
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)

export default Order