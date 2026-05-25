import User from "../model/userModel.js"


export const getCurrentUser = async (req, res) => {
    try {
        let user = await User.findById(req.userId).select("-password")
        if (!user) {
            return res.status(401).json({ message: "user is not found or session expired" })
        }
        return res.status(200).json(user)
    } catch (error) {
        console.error("getCurrentUser error:", error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getAdmin = async (req, res) => {
    try {
        let adminEmail = req.adminEmail;
        if (!adminEmail) {
            return res.status(404).json({ message: "Admin is not found" })
        }
        return res.status(201).json({
            email: adminEmail,
            role: "admin"
        })
    } catch (error) {
        console.error("getAdmin error:", error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password")
        return res.status(200).json(users)
    } catch (error) {
        console.error("getAllUsers error:", error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}