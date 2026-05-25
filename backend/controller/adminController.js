import Order from '../model/orderModel.js'
import User from '../model/userModel.js'

export const getAnalytics = async (req, res) => {
    try {
        const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

        // 1. Total Revenue
        const totalRevenueData = await Order.aggregate([
            { $match: { $or: [{ payment: true }, { status: 'Delivered' }] } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const totalRevenue = totalRevenueData[0]?.total || 0;

        const totalOrders = await Order.countDocuments({});
        const totalUsers = await User.countDocuments({});

        // 2 & 3. Daily Revenue and Orders Over Time
        const dailyDataArray = await Order.aggregate([
            { $match: { date: { $gte: thirtyDaysAgo } } },
            { 
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$date" } } },
                    revenue: { 
                        $sum: { 
                            $cond: [{ $or: [{ $eq: ["$payment", true] }, { $eq: ["$status", "Delivered"] }] }, "$amount", 0] 
                        } 
                    },
                    orders: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const revenueByDate = dailyDataArray.map(item => ({ date: item._id, revenue: item.revenue }));
        const ordersByDate = dailyDataArray.map(item => ({ date: item._id, orders: item.orders }));

        // 4. Order Status Distribution
        const orderStatusStatsArray = await Order.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        const orderStatusStats = {};
        orderStatusStatsArray.forEach(stat => {
            orderStatusStats[stat._id] = stat.count;
        });

        // 5. Top Selling Products
        const topProducts = await Order.aggregate([
            { $unwind: "$items" },
            { 
                $group: {
                    _id: "$items._id",
                    name: { $first: "$items.name" },
                    totalQuantitySold: { $sum: { $toInt: "$items.quantity" } },
                    totalRevenue: { $sum: { $multiply: [ { $toInt: "$items.quantity" }, { $toDouble: "$items.exchange_rate" } ] } }
                }
            },
            { $sort: { totalQuantitySold: -1 } },
            { $limit: 5 }
        ]);

        res.status(200).json({
            totalRevenue,
            totalOrders,
            totalUsers,
            revenueByDate,
            ordersByDate,
            orderStatusStats,
            topProducts
        });
    } catch (error) {
        console.error("Admin Analytics Error:", error);
        res.status(500).json({ message: "Error fetching analytics data" });
    }
};
