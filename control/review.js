const asyncHandler = require("express-async-handler");
const ApiError = require(`../utils/apierror`);
const ReviewModle = require("../models/Reviewmodel");
const Factory_Handler = require(`../control/Factory_Handler`);

exports.setcategoryid = (req, res, next) => {
  if (!req.body.product) {
    req.body.product = req.params.productsid;
  }
  next();
};

exports.careatfilterobjects = (req, res, next) => {
  let filterobject = {};
  if (req.params.productsid) filterobject = { product: req.params.productsid };
  req.filterobject = filterobject;
  next();
};
exports.createReview = Factory_Handler.CreateDoc(ReviewModle, `Products`);

exports.getAllReview = Factory_Handler.getAllDoc(ReviewModle);

exports.getReview = Factory_Handler.getDoc(ReviewModle);

exports.deleteReview = Factory_Handler.DeleteOneDoc(ReviewModle);
