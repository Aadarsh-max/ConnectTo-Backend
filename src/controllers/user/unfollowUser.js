import User from "../../models/User.js";

const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user._id.toString() === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot unfollow yourself",
      });
    }

    const userToUnfollow = await User.findById(userId);

    if (!userToUnfollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isFollowing = userToUnfollow.followers.includes(req.user._id);

    if (!isFollowing) {
      return res.status(400).json({
        success: false,
        message: "User is not followed",
      });
    }

    userToUnfollow.followers.pull(req.user._id);

    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        following: userId,
      },
    });

    await userToUnfollow.save();

    return res.status(200).json({
      success: true,
      message: "User unfollowed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default unfollowUser;