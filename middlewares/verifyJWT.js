const jwt = require("jsonwebtoken");

const verifyJWT = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization || req.headers.Authorization;
      //console.log(authHeader)

      if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          console.error("JWT Verification Error:", err);
          return res.status(403).json({ message: "Forbidden" });
        }
        const { i, e, r, p } = decoded;
        if (p && allowedRoles.includes(p)) {
          req.id = i;
          req.email = e;
          req.roleUser = r;
          next();
        } else {
          return res.status(401).json({ message: "Unauthorized" });
        }
      });
    } catch {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

module.exports = verifyJWT;