const JWT = require('jsonwebtoken')
const User = require('../models/userSchema')


const authenticateToken = async function (req, res) {
    try {
        const token = req.header("Authorization")
        const decoded = JWT.verify(token,process.env.SECRET_KEY);
        console.log(decoded);
        if (!decoded._id) {
            throw new Error();
        }
        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });
        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
        res.sendStatus(401)
    }
}

module.exports = authenticateToken;