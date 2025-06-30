const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email or password field is empty" });
    }

    const emailExist = await UserModel.findOne({ email });
    if (emailExist) {
      return res.status(409).json({
        message: "user already exist",
      });
    }

    // set first user as an admin

    const isFIrstUser = (await UserModel.countDocuments({})) === 0;

    const role = isFIrstUser ? "admin" : "user";

    const user = await UserModel.create({ email, password, role });
    // generate token
    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRETE,
      { expiresIn: "1d" }
    );

    const expiresInOneDay = 1000 * 60 * 60 * 24;

    // attach cookie to response

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: new Date(Date.now() + expiresInOneDay),
    });
    console.log(user.email);

    return res
      .status(201)
      .json({ message: "User created successfully", data: user.email });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      data: null,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "provide login details",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "unauthenticated" });
    }

    const correctPassword = await user.comparePassword(password);

    if (!correctPassword) {
      return res.status(401).json({ message: "unauthenticated" });
    }

    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRETE,
      { expiresIn: "1d" }
    );

    const expiresIn = 1000 * 60 * 60 * 24;

    // attach cookie to response

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: new Date(Date.now() + expiresIn),
    });

    return res.status(200).json({ message: "Login successfull" });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      data: null,
    });
  }
};

const logout = async (_, res) => {
  res.clearCookie("token");

  return res.status(200).json({ message: "logout successfull" });
};

module.exports = {
  register,
  login,
  logout,
};
