const express = require("express");
const {
  createWishlistValidator,
  removeWishlistValidator,
} = require(`../utils/Wishlistvalidator`);
const router = express.Router();
const {
  AddTowishList,
  RemovewishList,
  getleggedwishList,
} = require("../control/Wishlist");

router.route("/AddWishlist").post(createWishlistValidator, AddTowishList);
router
  .route("/Removelist/:productId")
  .delete(removeWishlistValidator, RemovewishList);

router.route("/").get(getleggedwishList);

module.exports = router;
