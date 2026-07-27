const { body, validationResult } = require('express-validator');

const registerValidation = [
  body('name').notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars')
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required')
];

const jobValidation = [
  body('title').notEmpty().withMessage('Title required'),
  body('budget').isNumeric().withMessage('Budget must be number'),
  body('description').notEmpty().withMessage('Description required')
];

// This function is the key - it checks for errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Export BOTH ways so it never crashes again
module.exports = { registerValidation, loginValidation, jobValidation, validate };
module.exports.validate = validate;
module.exports.default = { registerValidation, loginValidation, jobValidation, validate };
