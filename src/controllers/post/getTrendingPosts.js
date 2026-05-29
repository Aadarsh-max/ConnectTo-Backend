import Post from "../../models/Post.js";

const getTrendingPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $match: {
          isArchived: false,
        },
      },
      {
        $addFields: {
          likesCount: {
            $size: "$likes",
          },
        },
      },
      {
        $sort: {
          likesCount: -1,
          commentsCount: -1,
          viewsCount: -1,
          createdAt: -1,
        },
      },
      {
        $limit: 20,
      },
    ]);

    await Post.populate(posts, {
      path: "user",
      select: "username fullName profilePicture",
    });

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

export default getTrendingPosts;
