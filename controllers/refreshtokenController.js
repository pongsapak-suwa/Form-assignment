const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const db = require("../models/index");

const refreshToken = asyncHandler(async (req, res) => {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(401).send("Access Denied. No refresh token provided.");
      }
  
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const accessToken = jwt.sign(
        {
          i: decoded.i,
          e: decoded.e,
          r: decoded.r,
          p: decoded.p,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" }
      );
  
      return res.status(200).json({
        message: "refresh accessToken success",
        accesstoken: accessToken,
      });
  });

  module.exports = {
    refreshToken,
  };