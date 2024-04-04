const jwt = require("jsonwebtoken");
const User = require("./models/userSchema");

const auth = async (req, res, next) => {
  try {
    const token =req.headers.authorization;
    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    if (!decoded.id) {
      throw new Error();
    }
    const user = await User.findOne({
      _id: decoded.id,
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
};

module.exports = auth;