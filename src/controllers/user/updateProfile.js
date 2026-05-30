import User from "../../models/User.js";

const updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      bio,
      interests,
      profilePicture,
      coverPicture,
      links,
    } = req.body;

    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (fullName !== undefined) user.fullName = fullName;
    if (bio !== undefined) user.bio = bio;
    if (interests !== undefined) user.interests = interests;
    if (profilePicture !== undefined) user.profilePicture = profilePicture;
    if (coverPicture !== undefined) user.coverPicture = coverPicture;
    if (links !== undefined) user.links = { ...user.links, ...links };

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default updateProfile;