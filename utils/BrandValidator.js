const { check } = require("express-validator");
const validatorErorr = require(`../Medileware/Validator`);

exports.getBrandValidator = [
  check(`id`).isMongoId().withMessage(`invalid id `),
  validatorErorr,
];

exports.updateBrandValidator = [
  check(`id`).isMongoId().withMessage(`invalid id `),
];

exports.creatBrandValidator = [
  check(`name`)
    .notEmpty()
    .withMessage("brand required")
    .isLength({ min: 1 })
    .withMessage("too short brand name")
    .isLength({ max: 30 })
    .withMessage("too long brand name"),
  validatorErorr,
];
exports.deleteBrandValidator = [
  check(`id`).isMongoId().withMessage(`invalid id `),
  validatorErorr,
];
