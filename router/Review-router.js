const express = require("express");
const {
  creatreviewValidator,

  deletereviewValidator,
} = require(`../utils/Reviewvaildator`);

const Auth = require(`../control/auth`);
const router = express.Router({ mergeParams: true });
const {
  createReview,
  getAllReview,
  getReview,

  deleteReview,
  setcategoryid,
  careatfilterobjects,
} = require("../control/review");

router
  .route("/")
  .post(setcategoryid, creatreviewValidator, createReview)
  .get(careatfilterobjects, getAllReview);

router
  .route("/:id")
  .get(getReview)

  .delete(
    Auth.Protect,
    Auth.allowTo("admin"),
    deletereviewValidator,
    deleteReview
  );

module.exports = router;
