import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    profileViews: {
      type: Number,
      default: 0,
    },
    postViews: {
      type: Number,
      default: 0,
    },
    totalLikes: {
      type: Number,
      default: 0,
    },
    totalComments: {
      type: Number,
      default: 0,
    },
    totalShares: {
      type: Number,
      default: 0,
    },
    totalSaves: {
      type: Number,
      default: 0,
    },
    engagementRate: {
      type: Number,
      default: 0,
    },
    followerGrowth: [
      {
        date: {
          type: Date,
          required: true,
        },
        count: {
          type: Number,
          default: 0,
        },
      },
    ],
    postPerformance: [
      {
        post: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
        likes: {
          type: Number,
          default: 0,
        },
        comments: {
          type: Number,
          default: 0,
        },
        shares: {
          type: Number,
          default: 0,
        },
        saves: {
          type: Number,
          default: 0,
        },
        views: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;
