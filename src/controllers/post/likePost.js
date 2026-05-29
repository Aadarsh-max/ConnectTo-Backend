import Post from "../../models/Post.js";

const likePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const isLiked = post.likes.includes(req.user._id);

    if (isLiked) {
      post.likes.pull(req.user._id);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    return res.status(200).json({
      success: true,
      message: isLiked
        ? "Post unliked successfully"
        : "Post liked successfully",
      likesCount: post.likes.length,
      isLiked: !isLiked,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default likePost;
