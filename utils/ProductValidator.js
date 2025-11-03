const { check } = require("express-validator");
const validatorErorr = require(`../Medileware/Validator`);
const categoriesmodel = require("../models/CategorySchema");
const brand = require(`../models/BrandsSchema`);
exports.getProductValidator = [
  check(`id`).isMongoId().withMessage(`invalid id `),
  validatorErorr,
];

exports.updateProductValidator = [
  check(`id`).isMongoId().withMessage(`invalid id `),

  validatorErorr,
];

exports.createProductValidator = [
  check(`title`)
    .notEmpty()
    .withMessage("product required")
    .isLength({ min: 2 })
    .withMessage("too short product name")
    .isLength({ max: 100 })
    .withMessage("too long product name"),

  check("description")
    .isLength({ min: 8 })
    .withMessage("discrepation must be great than 8")
    .notEmpty()
    .withMessage("discrepation is required"),
  check("sold").optional().isNumeric().withMessage("sold must be Number"),
  check("ratingsAverage")
    .optional()
    .isLength({ min: 1 })
    .withMessage("too short ratingAvrage")
    .isLength({ max: 5 })
    .withMessage("too long ratingAvrage"),
  check("quantity")
    .notEmpty()
    .withMessage("product Quantity is required ")
    .isNumeric()
    .withMessage(`Quantity must be number`),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingQuantity must be Number"),
  ,
  check(`Currency`).optional().isIn([`EGP`, `USD`, `SRA`, `EUR`]),

  check("price")
    .notEmpty()
    .withMessage(`product price is required`)
    .isLength({ min: 1 })
    .withMessage(`to short product price`)
    .isLength({ max: 30 })
    .withMessage(`to long product price`),
  check(`brand`)
    .optional()
    .isMongoId()
    .withMessage(`invalid id`)
    .custom(async (vlaue) => {
      const Brand = await brand.find({ _id: vlaue });
      if (!Brand) {
        throw new Error(`not found brand`);
      }
    }),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("priceAfterDiscount must be Number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error(`priceAfterDiscount must be loser than price`);
      }
      return true;
    }),

  check("images").optional().isArray().withMessage(`images must be array`),
  check("category")
    .isMongoId()
    .withMessage(`category invalid id `)
    .notEmpty()
    .withMessage(`catgory id is required`)
    .custom((value, { req }) => {
      return categoriesmodel.findById(value).then((category) => {
        if (!category) {
          console.log(category);
          return Promise.reject(new Error(`no category for id ${value}`));
        }
        if (req.body.colors) {
          req.body.colors = JSON.parse(req.body.colors);
        }
        console.log(category);
        return true; // ✅ لازم ترجع true لو كل شيء تمام
      });
    }),

  check("brand").optional().isMongoId().withMessage(`brand id is required`),
  check("colors").optional().isArray().withMessage(`colors must be array`),
  validatorErorr,
];
exports.deleteProductValidator = [
  check(`id`).isMongoId().withMessage(`invalid id `),
  validatorErorr,
];
