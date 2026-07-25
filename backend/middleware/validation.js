const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().lowercase().valid('client', 'artisan', 'admin', 'homeowner').required(),
  phone: Joi.string().allow('', null),
  location: Joi.string().allow('', null)
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const validate = (schema) => {
  return (req, res, next) => {
    if (req.body.role) {
      req.body.role = req.body.role.toLowerCase();
      if (req.body.role === 'homeowner') req.body.role = 'client';
    }
    const { error } = schema.validate(req.body);
    if (error) {
      console.log('VALIDATION FAIL:', error.details[0].message, req.body);
      return res.status(400).json({ msg: error.details[0].message });
    }
    next();
  };
};

module.exports = { validate, registerSchema, loginSchema };
