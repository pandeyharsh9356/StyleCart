import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        let { adminToken: token } = req.cookies
        console.log("AdminAuth Check. Token:", token ? "Present" : "Missing");

        if (!token) {
            console.log("AdminAuth Failed: No Token");
            return res.status(401).json({ message: "Not Authorized Login Again" })
        }

        let verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        
        console.log("AdminAuth Full Payload:", JSON.stringify(verifyToken));
        console.log("AdminAuth Expected Email (Raw):", `|${process.env.ADMIN_EMAIL}|`);

        const payloadEmail = (verifyToken?.email || "").trim().toLowerCase();
        const configEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();

        if (!verifyToken || !process.env.ADMIN_EMAIL || payloadEmail !== configEmail) {
            console.log("AdminAuth Failed: Identity Mismatch");
            console.log(`Mismatch details: Payload: |${payloadEmail}| vs Config: |${configEmail}|`);
            return res.status(401).json({ message: "Not Authorized" })
        }
        req.adminEmail = verifyToken.email
        next()

    } catch (error) {
        console.log("AdminAuth Error:", error.message);
        return res.status(401).json({ message: "Not Authorized Login Again" })
    }
}

export default adminAuth