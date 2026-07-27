const validation = (schema) => {
  return (req, res, next) => {
    if (!schema) return next();
    try {
      const { error } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      next();
    } catch (e) {
      next();
    }
  };
};

// Export both ways so it never crashes
module.exports = validation;
module.exports.validate = validation;
module.exports.default = validation;
