const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Users = require("../models/userSchema");
require("dotenv").config();

module.exports = asyncHandler(async (req, res, next) => {
  // console.log(req.headers);

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded =  jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Users.findById(decoded.id).select('-password')
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Now User Is Not Authorized");
    }
  }

  if (!token) {
    console.log("no token");
    res.status(401);
    throw new Error("User Not Authrized");
  }
});
