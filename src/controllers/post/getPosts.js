import Post from "../../models/Post.js";

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      isArchived: false,
    })
      .populate("user", "username fullName profilePicture")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default getPosts;