const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");  // <-- add this

exports.registerDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create({ user: req.user._id, ...req.body });
    res.json(doctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getDoctors = async (req, res) => {
  const doctors = await Doctor.find().populate("user", "name email");
  res.json(doctors);
};

exports.getDoctorAppointments = async (req, res) => {
  try {
    // Get the doctor document linked to the logged-in user
    const doctor = await Doctor.findOne({ user: req.user._id });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const appointments = await Appointment.find({ doctor: doctor._id })
      .populate("patient", "name email");

    res.json(appointments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user._id })
      .populate("user", "name email");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.json({
      name: doctor.user.name,
      email: doctor.user.email,
      specialization: doctor.specialization,
      role: req.user.role,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
