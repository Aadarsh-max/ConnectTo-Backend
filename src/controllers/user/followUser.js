import User from "../../models/User.js";

const followUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user._id.toString() === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    const userToFollow = await User.findById(userId);

    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isFollowing = userToFollow.followers.includes(req.user._id);

    if (isFollowing) {
      return res.status(400).json({
        success: false,
        message: "User already followed",
      });
    }

    userToFollow.followers.push(req.user._id);

    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: {
        following: userId,
      },
    });

    await userToFollow.save();

    return res.status(200).json({
      success: true,
      message: "User followed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default followUser;