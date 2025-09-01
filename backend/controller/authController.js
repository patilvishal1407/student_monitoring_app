const jwt = require('jsonwebtoken');
const SECRET = "supersecretkey";

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (username === "teacher" && password === "password123") {
    const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }
  res.status(401).json({ message: "Invalid credentials" });
};
