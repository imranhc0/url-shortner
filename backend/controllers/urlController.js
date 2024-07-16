const URL = require('../models/URL');
const User = require('../models/User');
const shortid = require('shortid');

exports.shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = shortid.generate();
  const userId = req.user ? req.user.userId : null;
  const clientIp = req.ip;

  try {
    if (!userId) {
      // Count URLs created by IP address if the user is not authenticated
      const urlCount = await URL.countDocuments({ clientIp });

      if (urlCount >= 3) {
        return res.status(403).json({ message: 'URL limit reached for unauthenticated users' });
      }
    } else {
      // Count URLs created by authenticated user
      const urlCount = await URL.countDocuments({ userId });

    //   if (urlCount >= 3) {
    //     return res.status(403).json({ message: 'URL limit reached for authenticated users' });
    //   }
    }

    const url = new URL({ originalUrl, shortUrl, userId, clientIp });
    await url.save();

    res.status(201).json(url);
  } catch (error) {
    res.status(500).json({ message: 'Error shortening URL', error });
  }
};

exports.redirectUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await URL.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    url.clicks += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ message: 'Error redirecting URL', error });
  }
};
