const User = require("../models/User");
const Doctor = require("../models/Doctor");
const jwt = require("jsonwebtoken");

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await User.create({ name, email, password, role });
    if (role === "doctor") {
      await Doctor.create({ user: user._id });
    }
    res.json({ token: generateToken(user._id), user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({ token: generateToken(user._id), user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPatientProfile = async (req, res) => {
  try {
    res.json({
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
