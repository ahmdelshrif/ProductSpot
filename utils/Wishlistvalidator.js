const { check, body } = require("express-validator");
const validatorError = require("../Medileware/Validator");
const ProductModel = require("../models/ProductSchema");

// ✅ Validator لإضافة منتج للـ Wishlist
exports.createWishlistValidator = [
  check("productId")
    .notEmpty()
    .withMessage("productId is required")
    .isMongoId()
    .withMessage("invalid product id")
    .custom(async (value) => {
      const product = await ProductModel.findById(value);
      if (!product) {
        throw new Error("No product found with this ID");
      }
      return true;
    }),
  validatorError,
];

// ✅ Validator لحذف منتج من الـ Wishlist
exports.removeWishlistValidator = [
  check("productId")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("invalid id"),
  validatorError,
];
