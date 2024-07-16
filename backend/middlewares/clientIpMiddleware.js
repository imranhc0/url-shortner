const clientIpMiddleware = (req, res, next) => {
    req.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    next();
  };
  
  module.exports = clientIpMiddleware;
  