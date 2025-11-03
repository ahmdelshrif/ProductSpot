const express = require("express");
// const {
//   createWishlistValidator,
//   RemoveWishlistValidator,
// } = require(`../utils/Wishlistvalidator`);
const router = express.Router();
const {
  creatTaxPrice,
  UpdateTaxPrice,
  DeleteTaxPrice,
  GetTaxPrice,
} = require("../control/Taxprice");

const Auth = require(`../control/auth`);

router.route("/").post(Auth.Protect, Auth.allowTo(`admin`), creatTaxPrice);
router
  .route("/:AreaId")
  .delete(Auth.Protect, Auth.allowTo(`admin`), DeleteTaxPrice)
  .put(Auth.Protect, Auth.allowTo(`admin`), UpdateTaxPrice);

router.route("/").get(Auth.Protect, Auth.allowTo(`admin`, `user`), GetTaxPrice);

module.exports = router;
