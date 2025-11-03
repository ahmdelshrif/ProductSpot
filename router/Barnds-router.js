const express = require("express");
const {
  getBrandValidator,
  deleteBrandValidator,
  creatBrandValidator,
  updateBrandValidator,
} = require(`../utils/BrandValidator`);

const Auth = require(`../control/auth`);
const router = express.Router();
const {
  getAllBrand,
  createBrand,
  getBrand,
  upadateBrand,
  deleteBrand,
  uploadbrandimage,
  resize,
} = require("../control/Barnd");

router
  .route("/")
  .post(
    Auth.Protect,
    Auth.allowTo("admin"),
    uploadbrandimage,
    resize,
    creatBrandValidator,
    createBrand
  )
  .get(getAllBrand);

router
  .route("/:id")
  .get(getBrandValidator, getBrand)

  .put(
    Auth.Protect,
    Auth.allowTo("admin"),
    uploadbrandimage,
    resize,
    updateBrandValidator,
    upadateBrand
  )

  .delete(
    Auth.Protect,
    Auth.allowTo("admin"),
    deleteBrandValidator,
    deleteBrand
  );

module.exports = router;
