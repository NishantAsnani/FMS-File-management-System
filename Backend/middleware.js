const jwt = require("jsonwebtoken");
const User = require("./models/userSchema");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("Authorization token not provided");
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded.id) {
      throw new Error("Invalid token");
    }

    const user = await User.findOne({
      _id: decoded.id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("User not found");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.sendStatus(401);
  }
};

module.exports = auth;
