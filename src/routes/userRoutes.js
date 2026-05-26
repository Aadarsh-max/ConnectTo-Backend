import express from "express";
import protect from "../middleware/authMiddleware.js";
import getProfile from "../controllers/user/getProfile.js";
import updateProfile from "../controllers/user/updateProfile.js";
import followUser from "../controllers/user/followUser.js";
import unfollowUser from "../controllers/user/unfollowUser.js";
import searchUsers from "../controllers/user/searchUsers.js";

const router = express.Router();

router.get("/search", protect, searchUsers);
router.get("/:username", protect, getProfile);
router.put("/update", protect, updateProfile);
router.patch("/:userId/follow", protect, followUser);
router.patch("/:userId/unfollow", protect, unfollowUser);

export default router;