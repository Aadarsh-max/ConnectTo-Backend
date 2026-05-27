import Analytics from "../../models/Analytics.js";

const getDashboardStats = async (req, res) => {
  try {
    const analytics = await Analytics.findOne({
      user: req.user._id,
    });

    if (!analytics) {
      return res.status(404).json({
        success: false,
        message: "Analytics not found",
      });
    }

    return res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default getDashboardStats;