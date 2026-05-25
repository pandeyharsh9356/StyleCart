import jwt from 'jsonwebtoken'
import fs from 'fs'


const isAuth = async (req,res,next) => {
    try {
        let {userToken: token} = req.cookies
        
        if(!token){
            return res.status(401).json({message:"user does not have token"})
        }
        let verifyToken = jwt.verify(token,process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(401).json({message:"user does not have a valid token"})
        }
        req.userId = verifyToken.userId
        
        // Debug logging
        fs.appendFileSync('auth_debug.log', `[${new Date().toISOString()}] Valid Token for userId: ${req.userId}\n`);

        next()

    } catch (error) {
         console.log("isAuth error")
    return res.status(500).json({message:`isAuth error ${error}`})
        
    }
}

export default isAuth