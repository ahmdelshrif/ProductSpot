const express = require("express");

const router = express.Router();

const Auth = require(`../control/auth`);

const product_router = require(`./product-router`);
router.use(`/:categoryId/products`, product_router);

const {
  getCategoryValidator,
  deleteCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
} = require(`../utils/CategoryValidator`);

const {
  getAllCategory,
  createCategory,
  getCategory,
  upadateCategory,
  deletCategory,
  uploadcategoryimage,
  resize,
} = require("../control/Category");

router
  .route("/")
  .post(
    Auth.Protect,
    Auth.allowTo("admin"),
    uploadcategoryimage,
    resize,
    createCategoryValidator,
    createCategory
  )
  .get(getAllCategory);

router
  .route("/:id")

  .get(getCategoryValidator, getCategory)

  .put(
    Auth.Protect,
    Auth.allowTo("admin"),
    uploadcategoryimage,
    resize,
    updateCategoryValidator,
    upadateCategory
  )

  .delete(
    Auth.Protect,
    Auth.allowTo("admin"),
    deleteCategoryValidator,
    deletCategory
  );

module.exports = router;
