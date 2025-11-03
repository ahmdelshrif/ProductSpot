const asyncHandler = require("express-async-handler");
const ApiError = require(`../utils/apierror`);
const TaxPriceModle = require("../models/TaxPriceSchema");
const Factory_Handler = require(`../control/Factory_Handler`);

exports.creatTaxPrice = asyncHandler(async (req, res, next) => {
  const taxprice = await TaxPriceModle.create({
    area: req.body.Area,
    taxPrice: req.body.TaxPrice,
  });
  res
    .status(200)
    .json({ massege: `Creat Area is successfuly`, data: taxprice });
});

exports.UpdateTaxPrice = asyncHandler(async (req, res, next) => {
  const taxprice = await TaxPriceModle.findOneAndUpdate(
    { _id: req.params.AreaId },
    {
      Taxprice: req.body.TaxPrice,
    },
    { new: true }
  );
  if (!taxprice) {
    res.status(200).json(` Area is not found `);
  }
  res.status(200).json(`update Area is successfuly `);
});

exports.DeleteTaxPrice = asyncHandler(async (req, res, next) => {
  const taxprice = await TaxPriceModle.findOneAndDelete({
    _id: req.params.AreaId,
  });
  if (!taxprice) {
    res.status(200).json(` Area is not found `);
  }
  res.status(200).json(`delete Area is successfuly `);
});

exports.GetTaxPrice = asyncHandler(async (req, res, next) => {
  const taxprice = await TaxPriceModle.find({});
  if (!taxprice) {
    res.status(200).json(` no dilvered in this Area `);
  }

  res.status(200).json({ status: `success`, data: taxprice });
});
