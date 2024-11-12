// validates the scheme of the request body

const body = (scheme) => {
  return (req, res, next) => {
    const { error } = scheme.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        message: "Invalid or missing body params",
        error: error.details.map((error) => ({
          field: error.path[0],
          message: error.message,
        })),
      });
    }
    next();
  };
};

const query = (scheme) => {
  return (req, res, next) => {
    const { error } = scheme.validate(req.query, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        message: "Invalid or missing query params",
        error: error.details.map((error) => ({
          field: error.path[0],
          message: error.message,
        })),
      });
    }
    next();
  };
};

module.exports = { query, body };
