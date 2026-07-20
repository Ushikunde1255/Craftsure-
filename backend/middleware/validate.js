const Joi = require('joi');

// Generic validator factory
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const messages = error.details.map(d => d.message);
      return res.status(400).json({ 
        msg: 'Validation failed', 
        errors: messages 
      });
    }
    next();
  };
};

// Schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
  role: Joi.string().valid('client', 'artisan').default('client'),
  phone: Joi.string().min(8).max(20).optional(),
  location: Joi.string().max(100).optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const jobSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  description: Joi.string().min(20).max(2000).required(),
  category: Joi.string().required(),
  budget: Joi.number().min(500).required(),
  location: Joi.string().required(),
  deadline: Joi.date().optional()
});

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  jobSchema
};
