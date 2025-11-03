const express = require("express");
const {
  createbannerValidator,
  getbannerValidator,
  updatebannerValidator,
} = require(`../utils/bannervalidator`);

const Auth = require(`../control/auth`);
const router = express.Router();
const {
  getAllBanner,
  deleteBanner,
  createBanner,
  upadateBanner,
  uploadsfile,
  raizon,
  getBanner,
} = require("../control/banner");

router
  .route("/")
  .post(
    Auth.Protect,
    Auth.allowTo("admin"),
    uploadsfile,
    raizon,
    createbannerValidator,
    createBanner
  )
  .get(getAllBanner);

router
  .route("/:id")
  .put(
    Auth.Protect,
    Auth.allowTo("admin"),
    uploadsfile,
    raizon,
    updatebannerValidator,
    upadateBanner
  )
  .get(getbannerValidator, getBanner)

  .delete(Auth.Protect, Auth.allowTo("admin"), deleteBanner);

module.exports = router;
