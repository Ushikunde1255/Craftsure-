const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization') || req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, login again!' });

  try {
    const cleanToken = token.replace('Bearer ', '');
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET || 'craftsure_secret_2024');
    req.user = decoded; // { id, name, email, phone }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token invalid, login again!' });
  }
};
