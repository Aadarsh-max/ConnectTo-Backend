import Post from "../../models/Post.js";
import User from "../../models/User.js";

const savePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const isSaved = post.savedBy.includes(req.user._id);

    if (isSaved) {
      post.savedBy.pull(req.user._id);

      await User.findByIdAndUpdate(req.user._id, {
        $pull: {
          savedPosts: postId,
        },
      });
    } else {
      post.savedBy.push(req.user._id);

      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: {
          savedPosts: postId,
        },
      });
    }

    await post.save();

    return res.status(200).json({
      success: true,
      message: isSaved
        ? "Post removed from saved"
        : "Post saved successfully",
      isSaved: !isSaved,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default savePost;