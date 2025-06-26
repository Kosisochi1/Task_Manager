const joi = require("joi");

const validateUser = async (req, res, next) => {
  try {
    const schema = joi.object({
      email: joi.string().required().email(),
      password: joi.string().required().min(6),
    });
    await schema.validateAsync(req.body, { abortEarly: true });
    next();
  } catch (error) {
    return res.status(422).json({
      massage: "Fill your Username and Password",
      success: false,
    });
  }
};

module.exports = {
  validateUser,
};
