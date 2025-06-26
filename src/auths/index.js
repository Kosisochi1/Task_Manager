const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  // console.log(token);

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: No token provide",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRETE);
    req.user = { email: payload.email, _id: payload._id };
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized: Invalid token",
      error: error,
    });
  }
};
module.exports = { authenticateUser };
