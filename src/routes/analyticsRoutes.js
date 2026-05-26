import express from "express";
import protect from "../middleware/authMiddleware.js";
import getDashboardStats from "../controllers/analytics/getDashboardStats.js";
import getEngagementStats from "../controllers/analytics/getEngagementStats.js";
import getFollowersGrowth from "../controllers/analytics/getFollowersGrowth.js";

const router = express.Router();

router.get("/dashboard", protect, getDashboardStats);
router.get("/engagement", protect, getEngagementStats);
router.get("/followers-growth", protect, getFollowersGrowth);

export default router;