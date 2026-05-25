import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import razorpay from 'razorpay'
import dotenv from 'dotenv'
import { sendEmail } from "../config/emailConfig.js";

dotenv.config()
const currency = 'inr'
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// Helper utilities to reduce function complexity
const getVerifiedDiscount = (promoCode, discount) => {
    if (promoCode && promoCode.toUpperCase() === 'WELCOME20') {
        return discount || 0
    }
    return 0
}

const createAndSaveOrder = async ({ items, amount, address, userId, paymentMethod, promoCode, discount }) => {
    const orderData = {
        items,
        amount,
        userId: userId.toString(),
        address,
        paymentMethod,
        payment: false,
        date: Date.now(),
        promoCode: promoCode || '',
        discount: discount || 0
    }
    const newOrder = new Order(orderData)
    await newOrder.save()
    return newOrder
}

const clearUserCart = async (userId) => {
    return User.findByIdAndUpdate(userId, { cartData: {} })
}

const sendOrderConfirmationEmail = async (user, amount, method, orderId) => {
    if (!user || !user.email) return
    try {
        if (method === 'COD') {
            await sendEmail(
                user.email,
                "Order Placed Successfully",
                `Hello ${user.name}, your order of ₹${amount} has been placed successfully via COD.`,
                `<h1>Order Confirmation</h1><p>Hello ${user.name},</p><p>Your order for ₹${amount} has been placed successfully. Payment mode: <b>Cash on Delivery</b>.</p><p>Thank you for shopping with StyleCart!</p>`
            )
        } else {
            await sendEmail(
                user.email,
                "Payment Successful & Order Confirmed",
                `Hello ${user.name}, your payment for order ${orderId} was successful.`,
                `<h1>Payment Successful</h1><p>Hello ${user.name},</p><p>Your payment for order <b>${orderId}</b> was successful and your order is confirmed.</p><p>Thank you for shopping with StyleCart!</p>`
            )
        }
    } catch (emailError) {
        console.error("Failed to send order confirmation email:", emailError)
    }
}

const createRazorpayOrder = (options) => {
    return new Promise((resolve, reject) => {
        razorpayInstance.orders.create(options, (error, order) => {
            if (error) return reject(error)
            resolve(order)
        })
    })
}

// for User
export const placeOrder = async (req, res) => {
    try {
        const { items, amount, address, promoCode, discount } = req.body
        const userId = req.userId

        const verifiedDiscount = getVerifiedDiscount(promoCode, discount)

        await createAndSaveOrder({
            items,
            amount,
            address,
            userId,
            paymentMethod: 'COD',
            promoCode,
            discount: verifiedDiscount
        })

        const user = await User.findById(userId)
        await clearUserCart(userId)

        // Best-effort notification; failures are logged inside helper
        await sendOrderConfirmationEmail(user, amount, 'COD')

        return res.status(201).json({ message: 'Order Place' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Order Place error' })
    }
}



export const placeOrderRazorpay = async (req, res) => {
    try {
        const { items, amount, address, promoCode, discount } = req.body
        const userId = req.userId

        const newOrder = await createAndSaveOrder({
            items,
            amount,
            address,
            userId,
            paymentMethod: 'Razorpay',
            promoCode,
            discount: discount || 0
        })

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        const order = await createRazorpayOrder(options)
        return res.status(200).json(order)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}


export const verifyRazorpay = async (req, res) => {
    try {
        const userId = req.userId
        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            const { razorpay_payment_id } = req.body
            await Order.findByIdAndUpdate(orderInfo.receipt, { payment: true, paymentId: razorpay_payment_id })
            const user = await User.findById(userId)
            await clearUserCart(userId)

            // Best-effort email notification
            await sendOrderConfirmationEmail(user, null, 'RAZORPAY', orderInfo.receipt)

            return res.status(200).json({ message: 'Payment Successful' })
        }

        return res.json({ message: 'Payment Failed' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}






export const userOrders = async (req, res) => {
    try {
        const userId = req.userId.toString();
        const orders = await Order.find({ userId });
        
        // Debug logging
        try {
            const fs = await import('fs');
            fs.appendFileSync('auth_debug.log', `[${new Date().toISOString()}] userOrders: Searching for userId: [${userId}], Found: ${orders.length} orders.\n`);
        } catch (e) {}

        const statusMap = {
            'Order Placed': 'Pending',
            'Packing': 'Processing',
            'Shipped': 'Shipped',
            'Out for delivery': 'Out for Delivery',
            'Delivered': 'Delivered',
            'Cancelled': 'Cancelled'
        }

        const formattedOrders = orders.map(order => ({
            _id: order._id,
            items: order.items,
            amount: order.amount,
            date: order.date,
            deliveryStatus: statusMap[order.status] || order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            address: order.address
        }))

        return res.status(200).json(formattedOrders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "userOrders error" })
    }

}




//for Admin




export const allOrders = async (req, res) => {
    try {
        console.log("AdminAPI [Backend Debug]: Fetching all orders from Database...");
        const orders = await Order.find({})
        
        // Backend validation check
        const validOrders = orders.filter(o => o.payment === true || o.status === 'Delivered');
        const calculatedRevenue = validOrders.reduce((acc, o) => acc + (o.amount || 0), 0);
        console.log(`AdminAPI [Backend Debug]: Fetched ${orders.length} orders. Expected Revenue from ${validOrders.length} valid orders is ₹${calculatedRevenue}.`);
        
        res.status(200).json(orders)
    } catch (error) {
        console.log("AdminAllOrders Error:", error)
        return res.status(500).json({ message: "adminAllOrders error" })

    }

}

export const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body
        const userId = req.userId

        const order = await Order.findById(orderId)

        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }

        if (order.userId !== userId.toString()) {
            return res.status(403).json({ message: 'Unauthorized' })
        }

        if (order.status !== 'Pending' && order.status !== 'Processing' && order.status !== 'Order Placed' && order.status !== 'Packing') {
            return res.status(400).json({ message: 'Order cannot be cancelled at this stage' })
        }

        // Automatic Refund for Razorpay
        if (order.paymentMethod === 'Razorpay' && order.payment && order.paymentId) {
            try {
                await razorpayInstance.payments.refund(order.paymentId, {
                    amount: order.amount * 100 // amount in smallest currency unit
                })
            } catch (refundError) {
                console.error("Razorpay Refund Error:", refundError)
                return res.status(500).json({ message: 'Cancellation failed due to refund error. Please contact support.' })
            }
        }

        await Order.findByIdAndUpdate(orderId, { status: 'Cancelled' })
        return res.status(200).json({ message: 'Order Cancelled' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Cancellation error' })
    }
}

export const updateStatus = async (req, res) => {

    try {
        const { orderId, status } = req.body

        const allowedStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' })
        }

        await Order.findByIdAndUpdate(orderId, { status })
        return res.status(201).json({ message: 'Status Updated' })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}