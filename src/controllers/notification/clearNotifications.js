import Notification from "../../models/Notification.js";

const clearNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({
      recipient: req.user._id,
    });

    return res.status(200).json({
      success: true,
      message: "Notifications cleared successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default clearNotifications;