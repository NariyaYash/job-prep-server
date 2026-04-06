const jwt = require("jsonwebtoken");
const tokenBlackList = require("../models/tokenBlackList.model");



async function authUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Token not Provided"
        })
    }

    const isTokenBlackList = await tokenBlackList.findOne({ token: token });

    if (isTokenBlackList) {
        return res.status(401).json({
            message: "Invalid token(TokenBlackList)"
        })
    }

    try {

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Invalid token"
                })
            }

            req.user = decoded

            next();

        });

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = { authUser }