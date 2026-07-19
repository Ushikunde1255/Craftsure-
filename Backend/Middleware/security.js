const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
exports.helmet = helmet();
exports.generalLimiter = rateLimit({ windowMs: 60*1000, max: 200 });
exports.authLimiter = rateLimit({ windowMs: 15*60*1000, max: 20 });
