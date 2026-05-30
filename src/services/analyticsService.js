const calculateEngagementRate = ({
  likes = 0,
  comments = 0,
  shares = 0,
  saves = 0,
  followers = 0,
}) => {
  if (!followers) return 0;

  const totalEngagement =
    likes + comments + shares + saves;

  return Number(
    ((totalEngagement / followers) * 100).toFixed(2)
  );
};

export { calculateEngagementRate };