const { check } = require("express-validator");
const validatorErorr = require(`../Medileware/Validator`);
exports.createOrderValidator = [
  check("address.alias").notEmpty().withMessage("alias is required"),

  check("address.details").notEmpty().withMessage("details is required"),

  check("address.phone")
    .notEmpty()
    .withMessage("phone is required")
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("invalid phone number"),

  check("address.city").notEmpty().withMessage("city is required"),
  check("cart")
    .isArray({ min: 1 })
    .withMessage("Cart must have at least 1 item"),

  check("cart.*.product")
    .notEmpty()
    .withMessage("productId is required")
    .isMongoId()
    .withMessage("productId must be a valid MongoId"),

  check("cart.*.quantity")
    .notEmpty()
    .withMessage("quantity is required")
    .isInt({ min: 1 })
    .withMessage("quantity must be at least 1"),

  check("cart.*.color")
    .optional()
    .isString()
    .withMessage("color must be a string"),

  validatorErorr,
];
exports.getorderValidator = [
  check(`id`).isMongoId().withMessage(`invalid id `),
  validatorErorr,
];

exports.updateorderValidator = [
  check(`id`).isMongoId().withMessage(`invalid id `),

  validatorErorr,
];
