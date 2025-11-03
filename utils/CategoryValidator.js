const { check } = require("express-validator");
const validatorErorr = require(`../Medileware/Validator`);
const categorymodel = require(`../models/CategorySchema`);
const apierror = require(`../utils/apierror`);

exports.getCategoryValidator = [
  check(`id`).isMongoId().withMessage(`invalid id `),
  validatorErorr,
];

exports.updateCategoryValidator = [
  check(`id`).isMongoId().withMessage(`invalid id `),
  validatorErorr,
];

exports.createCategoryValidator = [
  check(`name`)
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("too short Category name")
    .isLength({ max: 30 })
    .withMessage("too long Category name")
    .custom(async (value) => {
      const category = await categorymodel.find(value);
      if (category) {
        throw new Error(`must be unqie`);
      }
      return ture;
    }),
  validatorErorr,
];
exports.deleteCategoryValidator = [
  check(`id`).isMongoId().withMessage(`invalid id `),
  validatorErorr,
];
