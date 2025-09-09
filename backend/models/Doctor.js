const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  specialization: String,
  experience: Number,
  availableSlots: [String] // ["2025-09-10 10:00", "2025-09-11 14:00"]
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);
