const { check } = require("express-validator");
const validatorError = require("../Medileware/Validator");
const Coupon = require("../models/CouponsSchema");

exports.createCouponValidator = [
  check("name")
    .notEmpty()
    .withMessage("name required")
    .custom(async (value) => {
      const coupon = await Coupon.findOne({ name: value });
      if (coupon) {
        throw new Error("do not repeat coupons");
      }
      return true;
    }),

  check("expire")
    .notEmpty()
    .withMessage("expire required")
    .isISO8601()
    .withMessage("must be a valid date")
    .custom((value) => {
      const expireDate = new Date(value);
      const now = new Date();

      // لو تاريخ الانتهاء أقدم من دلوقتي → خطأ
      if (expireDate < now) {
        throw new Error("expire must be greater than current date");
      }
      return true;
    }),

  check("discount")
    .notEmpty()
    .withMessage("discount required")
    .isNumeric()
    .withMessage("discount must be a number")
    .custom((value) => {
      if (value < 1 || value > 100) {
        throw new Error("discount must be between 1 and 100");
      }
      return true; // لازم ترجع true لو كل شيء تمام
    }),
  validatorError,
];
exports.deletecouponValidator = [
  check(`id`).isMongoId().withMessage(`invalid id `),
  validatorError,
];

exports.updatecouponValidator = [
  check(`id`).isMongoId().withMessage(`invalid id `),
  check("name")
    .optional()
    .custom(async (value) => {
      const coupon = await Coupon.findOne({ name: value });
      if (coupon) {
        throw new Error("do not repeat coupons");
      }
      return true;
    }),
  check("expire")
    .optional()
    .isISO8601()
    .withMessage("must be a valid date")
    .custom((value) => {
      const expireDate = new Date(value);
      const now = new Date();

      // لو تاريخ الانتهاء أقدم من دلوقتي → خطأ
      if (expireDate < now) {
        throw new Error("expire must be greater than current date");
      }
      return true;
    }),
  validatorError,
];
exports.getcouponValidator = [
  check(`id`).isMongoId().withMessage(`invalid id `),
  validatorError,
];
