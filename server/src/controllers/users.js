const db = require("../config/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password, address } = req.body;
  // Hash the password
  const sqlcheckEmail = "SELECT * FROM Users WHERE email = ?";
  db.query(sqlcheckEmail, [email], async (err, results) => {
    if (err) {
      return res.status(500).send("Error checking email");
    } else if (
      name === "" &&
      email === "" &&
      password === "" &&
      address === ""
    ) {
      return res.status(409).send("Complete Form");
    } else if (results.length > 0) {
      // Email is already registered
      return res.status(409).send("Email already exists");
    }
    // Email is not registered, proceed with registration
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql =
      "INSERT INTO Users (name, email, password, address) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, hashedPassword, address], (err, result) => {
      if (err) {
        return res.status(500).send("Error registering user");
      }
      return res.status(200).send("User registered successfully");
    });
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM Users WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.error("Error while logging in:", err);
      res.status(500).send("Error while logging in");
    } else {
      if (result.length > 0) {
        const user = result[0];
        // Compare the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          // Passwords match, generate JWT token
          const token = jwt.sign({ email: user.email }, "your_secret_key", {
            expiresIn: "1h",
          });
          res.status(200).json({ token });
        } else {
          res.status(401).send("Invalid credentials");
        }
      } else {
        res.status(404).send("User not found");
      }
    }
  });
};

const getUser = (req, res) => {
  const { email } = req.user; // Extracted from the token
  const sql = "SELECT * FROM Users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Error fetching user data:", err);
      res.status(500).json({ message: "Error fetching user data" });
    } else {
      if (result.length > 0) {
        const userData = {
          id: result[0].id,
          name: result[0].name,
          email: result[0].email,
          adrress: result[0].adrress,
          // Add other user data as needed
        };
        res.status(200).json(userData);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    }
  });
};

module.exports = { registerUser, loginUser, getUser };
