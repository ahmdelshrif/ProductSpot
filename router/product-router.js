const express = require("express");
const {
  getProductValidator,
  deleteProductValidator,
  createProductValidator,
  updateProductValidator,
} = require(`../utils/ProductValidator`);

const Auth = require(`../control/auth`);

const router = express.Router();
const {
  getAllProduct,
  createProduct,
  getProduct,
  upadateProduct,
  deleteProduct,
  uploadprooductsimage,
  resize,
} = require("../control/Product");

const reviewrouter = require("./Review-router");

router.use(`/rivews/:productsid/review`, reviewrouter);

router
  .route("/")
  .post(
    Auth.Protect,
    Auth.allowTo("admin"),
    uploadprooductsimage,
    resize,
    createProductValidator,
    createProduct
  )

  .get(getAllProduct);
router
  .route("/:id")
  .get(getProductValidator, getProduct)

  .put(
    Auth.Protect,
    Auth.allowTo("admin"),
    uploadprooductsimage,
    resize,
    updateProductValidator,
    upadateProduct
  )

  .delete(
    Auth.Protect,
    Auth.allowTo("admin"),
    deleteProductValidator,
    deleteProduct
  );

module.exports = router;
