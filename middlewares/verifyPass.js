require('dotenv').config()
const jwt = require("jsonwebtoken");

const verifyRegister = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      jwt.verify(token, process.env.PASS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          console.error("JWT Verification Error:", err);
          return res.status(403).json({ message: "Forbidden" });
        }
          next();

    })
};

module.exports = verifyRegister;