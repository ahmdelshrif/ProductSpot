const { check } = require("express-validator");
const validatorErorr = require(`../Medileware/Validator`);
const Review = require(`../models/Reviewmodel`);
// exports.getBrandValidator=[check(`id`).isMongoId().withMessage(`invalid id `),validatorErorr]

exports.creatreviewValidator = [
  check(`title`)
    .optional()
    .isLength({ min: 3 })
    .withMessage("too short review name"),
  check(`rating`)
    .notEmpty()
    .withMessage(`rating is requied`)
    .isFloat()
    .withMessage(`must be Number`),
  check(`product`).isMongoId().withMessage("invalid id"),
  check(`email`).optional().isEmail().withMessage(`email invalid`),

  validatorErorr,
];

exports.deletereviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("invalid id")
    .custom(async (value, { req }) => {
      const review = await Review.findById(value);
      if (!review) {
        throw new Error("no reviews found!");
      }
      if (req.User.role == `admin`) {
        return true;
      }
      // تأكد إن المستخدم هو صاحب الريفيو
      if (review.user._id.toString() !== req.User._id.toString()) {
        throw new Error("this review does not belong to this user!");
      }

      return true;
    }),
  validatorErorr,
];
