const express = require("express");
const {
  createOrderValidator,
  getorderValidator,
  updateorderValidator,
} = require(`../utils/OrderValidator`);
const router = express.Router();
const {
  createOrder,
  getOrder,
  GetAllOrder,
  updatetoOrderdelivered,
  updatetoOrderpaid,
  deleteOrder,
  uplodaingTransfer,
} = require("../control/Order");

const Auth = require(`../control/auth`);

router.route("/").post(createOrderValidator, uplodaingTransfer, createOrder);
router.route("/").get(Auth.Protect, Auth.allowTo("admin"), GetAllOrder);
router.route("/:id").get(getorderValidator, getOrder);
router
  .route("/:id/pay")
  .put(
    Auth.Protect,
    Auth.allowTo("admin"),
    updateorderValidator,
    updatetoOrderpaid
  );
router
  .route("/:id/dileverd")
  .put(
    Auth.Protect,
    Auth.allowTo("admin"),
    updateorderValidator,
    updatetoOrderdelivered
  );
router.route("/:id").delete(deleteOrder);
module.exports = router;
