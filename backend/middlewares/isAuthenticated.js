import jwt from "jsonwebtoken";

const isAuthenticated = async (req,res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"User not authenticated.",
                success:false,
            })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if(!decoded) {
            return res.status(401).json({
                message:"Invalid token.",
                success:false
            });
        }
        
        req.user = decoded;
        req.id = decoded.userId;

        next();
    } catch (error) {
        console.error("JWT verification error:", error.message);
        return res.status(401).json({
            message:"Authentication failed.",
            success: false
        });
    }
}
export default isAuthenticated;