const jwt = require("jsonwebtoken");
const config = require("config")

const secretKey = config.get("privateKey")

function login_required(req, res, next) {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(401).send("No Token available");
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    req.user = user;
    next();
  });
}

module.exports = login_required
