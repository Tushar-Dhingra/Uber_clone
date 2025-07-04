const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.authUser = async (req, res, next) => {
    let token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized - Access denied. No token provided." });
    }


    const isblacklistToken = await blacklistTokenModel.findOne({ token });
    if(isblacklistToken){
        return res.status(401).json({ message: "Access denied. Token is blacklisted." }); 
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)
        req.user = user;
        if (!user) {
            return res.status(401).json({ message: "User not found." });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized access." });
    }



}