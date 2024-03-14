const express = require("express");
const { validateLogin } = require("../validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const fs = require("fs");
let rawdata = fs.readFileSync("staffs.json");
let staff = JSON.parse(rawdata);

router = express.Router();

const secretKey = config.get("privateKey");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    secretKey,
    { expiresIn: "1h" }
  );
}

router.post("/", (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).send("Email and password are required");
  }
  const user = staff.find(
    (staff) => staff.email === email && staff.password === password
  );
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  const token = generateToken(user);
  res.json({ token });
});

module.exports = router;
