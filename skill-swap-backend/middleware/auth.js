const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.query.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const jwtSecret = '0ea346fa0603101378e96b21907f3ef553ad1e8a51a896d8dd37b65b9aff83c3';
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    const jwtSecret = '0ea346fa0603101378e96b21907f3ef553ad1e8a51a896d8dd37b65b9aff83c3';
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.id;
    res.status(401).json({ error: 'Invalid token.', token: token, secret: jwtSecret, decoded: decoded });
  }
};

module.exports = { verifyToken };