const express = require("express");
const { registerDoctor, getDoctors, getDoctorAppointments } = require("../controllers/doctorController");
const { protect, roleCheck } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", protect, roleCheck(["doctor"]), registerDoctor);
router.get("/", getDoctors);
router.get("/appointments", protect, roleCheck(["doctor"]), getDoctorAppointments);

module.exports = router;
