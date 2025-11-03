const { check } = require("express-validator");
const validatorErorr = require(`../Medileware/Validator`);
const slugify = require(`slugify`);
const apierro = require(`../utils/apierror`);
const User = require(`../models/UserSchema`);
const bcrypt = require(`bcrypt`);
exports.creatUserValidator = [
  check(`name`)
    .notEmpty()
    .withMessage("name required")
    .isLength({ min: 3 })
    .withMessage("too short Category name")
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check(`email`)
    .notEmpty()
    .withMessage(`email required`)
    .isEmail()
    .withMessage(`Invalid email format`)
    .custom((value) => {
      return User.findOne({ email: value }).then((user) => {
        console.log(user);
        if (user) {
          return Promise.reject(new Error("Email already exists"));
        }
        return true;
      });
    }),
  check(`phone`).optional().isMobilePhone([`ar-EG`, `ar-SA`]),
  check(`role`).optional(),
  check(`password`)
    .notEmpty()
    .withMessage(`password is required`)
    .isLength({ min: 8, max: 32 })
    .custom((password, { req }) => {
      if (password !== req.body.PasswordcComfirm) {
        throw Error(`password Not Comfirm `);
      }
      return true;
    }),
  check(`PasswordcComfirm`).notEmpty().withMessage(`PasswordcComfirm required`),

  validatorErorr,
];
exports.getUserValidator = [
  check(`id`).isMongoId().withMessage(`invalid id `),
  validatorErorr,
];

exports.updateUserValidator = [
  check(`id`).isMongoId().withMessage(`invalid id `),
];

exports.deleteUserValidator = [
  check(`id`).isMongoId().withMessage(`invalid id `),
  check(`phone`).optional().isMobilePhone([`ar-EG`, `ar-SA`]),
  check(`email`).optional().isEmail().withMessage(`Invalid email format`),
  check(`name`)
    .optional()
    .isLength({ min: 3 })
    .withMessage("too short Category name"),

  validatorErorr,
];
exports.ChanePasswordValidator = [
  check(`id`).isMongoId().withMessage(`invalid id `),
  check(`password`).notEmpty().withMessage(`password is required`),
  check(`PasswordcComfirm`)
    .notEmpty()
    .withMessage(`password Confirm is required`)
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw Error(`password is not confirm`);
      }
      return true;
    }),
  check(`Currentpassword`)
    .notEmpty()
    .withMessage(`Currentpassword is required`)
    .custom((value, { req }) => {
      return User.findOne({ _id: req.params.id }).then(async (user) => {
        if (!user) {
          throw new Error("User not found");
        }
        if (!(await bcrypt.compare(value, user.password))) {
          throw Error(`Currentpassword incorrect`);
        }
        return true;
      });
    }),
  validatorErorr,
];
