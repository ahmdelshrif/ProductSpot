const path = require(`path`);
const sharp = require(`sharp`);
const { uploadSinglefile } = require(`../Medileware/uploads`);
const { v4: uuidv4 } = require("uuid");
const Factory_Handler = require("./Factory_Handler");
const asyncHandler = require("express-async-handler");
const BrandsyModule = require("../models/BrandsSchema");

exports.uploadbrandimage = uploadSinglefile(`image`);

exports.resize = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();
  const filename = `brands-${uuidv4()}-${Date.now()}.jpeg`;
  const paths = path.join(__dirname, "../uploads/brands");
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat(`jpeg`)
    .jpeg({ quality: 90 })
    .toFile(`${paths}/${filename}`);
  req.body.image = filename;
  next();
});

exports.createBrand = Factory_Handler.CreateDoc(BrandsyModule, "Brands");

exports.getAllBrand = Factory_Handler.getAllDoc(BrandsyModule, "Brands");

exports.getBrand = Factory_Handler.getDoc(BrandsyModule);

exports.upadateBrand = Factory_Handler.UpdateOneDoc(BrandsyModule, "Brands");

exports.deleteBrand = Factory_Handler.DeleteOneDoc(BrandsyModule);
