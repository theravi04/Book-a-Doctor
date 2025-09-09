const express = require("express");
const { bookAppointment, getMyAppointments, updateAppointmentStatus } = require("../controllers/appointmentController");
const { protect, roleCheck } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/book", protect, roleCheck(["patient"]), bookAppointment);
router.get("/my", protect, roleCheck(["patient"]), getMyAppointments);
router.put("/:id/status", protect, roleCheck(["doctor", "admin"]), updateAppointmentStatus);

module.exports = router;
