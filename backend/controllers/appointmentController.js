const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date } = req.body;
    // Ensure doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      date
    });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ message: "Not found" });

    const doctor = await Doctor.findOne({ user: req.user._id });
    if (req.user.role === "doctor" && appointment.doctor.toString() !== doctor._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    appointment.status = status;
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};



exports.getMyAppointments = async (req, res) => {
  const appointments = await Appointment.find({ patient: req.user._id })
    .populate({
      path: "doctor",
      populate: { path: "user", select: "name email" },
    });

  res.json(appointments);
  // console.log(appointments);
  
};

