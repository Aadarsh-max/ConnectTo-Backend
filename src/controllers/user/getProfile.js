import User from "../../models/User.js";
import Post from "../../models/Post.js";

const getProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username })
      .select("-password")
      .populate("followers", "username fullName profilePicture")
      .populate("following", "username fullName profilePicture");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const posts = await Post.find({
      user: user._id,
      isArchived: false,
    })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      user,
      posts,
      postsCount: posts.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default getProfile;