const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

exports.getAllUsers = async (req, res) => {
  res.json(await User.find());
};

exports.getAllDoctors = async (req, res) => {
  res.json(await Doctor.find().populate("user"));
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email")
      .populate({
        path: "doctor",
        populate: { path: "user", select: "name email" },
      });
      res.json(appointments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAdminProfile = async (req, res) => {
  try {
    res.json({
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
