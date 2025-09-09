// routes/profileRoutes.js
const express = require("express");
const { protect, roleCheck } = require("../middleware/authMiddleware");
const { getPatientProfile } = require("../controllers/authController");
const { getDoctorProfile } = require("../controllers/doctorController");
const { getAdminProfile } = require("../controllers/adminController");

const router = express.Router();

router.get("/patient", protect, roleCheck(["patient"]), getPatientProfile);
router.get("/doctor", protect, roleCheck(["doctor"]), getDoctorProfile);
router.get("/admin", protect, roleCheck(["admin"]), getAdminProfile);

module.exports = router;
