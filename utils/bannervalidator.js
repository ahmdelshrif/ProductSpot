const { check } = require("express-validator");
const validatorErorr = require(`../Medileware/Validator`);

exports.createbannerValidator = [
  check(`name`)
    .notEmpty()
    .withMessage("banner required")
    .isLength({ min: 3 })
    .withMessage("too short banner name")
    .isLength({ max: 30 })
    .withMessage("too long banner name"),
  check(`description`)
    .optional()
    .isLength({ min: 10 })
    .withMessage("min length 10"),
  validatorErorr,
];
exports.getbannerValidator = [
  check(`id`).isMongoId().withMessage(`invalid id `),
  validatorErorr,
];

exports.updatebannerValidator = [
  check(`id`).isMongoId().withMessage(`invalid id `),
  check(`name`).optional().isLength({ min: 3 }),
  validatorErorr,
];

exports.deletebannerValidator = [
  check(`id`).isMongoId().withMessage(`invalid id `),
  validatorErorr,
];
