const URL = require('../models/URL');

exports.getStatistics = async (req, res) => {
  const { userId } = req.user;

  try {
    const urls = await URL.find({ userId });
    res.json(urls);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error });
  }
};
