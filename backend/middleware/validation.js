const validation = (schema) => {
  return (req, res, next) => {
    if (!schema) {
      console.log("Validation schema missing, skipping");
      return next();
    }
    const { error } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
        details: error.details
      });
    }
    next();
  };
};

module.exports = validation;
