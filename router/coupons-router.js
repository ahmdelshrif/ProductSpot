const express = require("express");
const {
  createCouponValidator,
  deletecouponValidator,
  getcouponValidator,
  updatecouponValidator,
} = require(`../utils/couponesValidator`);

const router = express.Router();
const {
  createCoupon,
  getAllCoupon,
  getCoupon,
  upadateCoupon,
  deleteCoupon,
} = require("../control/Coupones");

const Auth = require(`../control/auth`);
router.use(Auth.Protect, Auth.allowTo("admin"));
router.route("/").post(createCouponValidator, createCoupon).get(getAllCoupon);

router
  .route("/:id")
  .get(getcouponValidator, getCoupon)

  .put(updatecouponValidator, upadateCoupon)

  .delete(deletecouponValidator, deleteCoupon);

module.exports = router;
