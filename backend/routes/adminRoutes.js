const express = require("express");
const { getAllUsers, getAllDoctors, getAllAppointments } = require("../controllers/adminController");
const { protect, roleCheck } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/users", protect, roleCheck(["admin"]), getAllUsers);
router.get("/doctors", protect, roleCheck(["admin"]), getAllDoctors);
router.get("/appointments", protect, roleCheck(["admin"]), getAllAppointments);

module.exports = router;
