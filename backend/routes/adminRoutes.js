const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const { getOverview } = require("../controllers/adminController");

router.use(protect, adminOnly);
router.get("/overview", getOverview);

module.exports = router;