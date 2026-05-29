import Post from "../../models/Post.js";

const createPost = async (req, res) => {
  try {
    const { caption, media, hashtags } = req.body;

    if (!media || !media.length) {
      return res.status(400).json({
        success: false,
        message: "At least one media file is required",
      });
    }

    const post = await Post.create({
      user: req.user._id,
      caption,
      media,
      hashtags,
    });

    await post.populate(
      "user",
      "username fullName profilePicture"
    );

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default createPost;