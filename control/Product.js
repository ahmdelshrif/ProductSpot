const ProductyModule = require("../models/ProductSchema");
const Factory_Handler = require("./Factory_Handler");
const sharp = require(`sharp`);
const ApiError = require("../utils/apierror");
const { v4: uuidv4 } = require("uuid");
const { uploadMaxOFfiles } = require(`../Medileware/uploads`);
const path = require(`path`);
const asyncHandler = require("express-async-handler");

exports.SetVlueFrombody = (req, res, next) => {
  if (req.params.categoryId) req.body.category = req.params.categoryId;
  next();
};

exports.CreateObjectFilter = (req, res, next) => {
  const filterobject = {};
  if (req.params.categoryId) filterobject.category = req.params.categoryId;
  req.filterobject = filterobject;
};

exports.uploadprooductsimage = uploadMaxOFfiles([
  {
    name: `imageCover`,
    maxCount: 1,
  },
  {
    name: `images`,
    maxCount: 5,
  },
]);
exports.resize = asyncHandler(async (req, res, next) => {
  if (!req.files || !req.files.imageCover) {
    return next();
  }

  const filename = `products-${uuidv4()}-${Date.now()}.jpeg`;
  const paths = path.join(__dirname, "../uploads/products");

  await sharp(req.files.imageCover[0].buffer)
    .resize(600, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`${paths}/${filename}`);
  req.body.imageCover = filename;

  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (file) => {
        const filename = `products-${uuidv4()}-${Date.now()}.jpeg`;
        await sharp(file.buffer)
          .resize(600, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`${paths}/${filename}`);
        req.body.images.push(filename);
      })
    );
  }

  next();
});

exports.getAllProduct = Factory_Handler.getAllDoc(ProductyModule, "Products");

exports.getProduct = Factory_Handler.getDoc(ProductyModule, {
  path: `reviews`,
  select: `title rating -_id name`, 
});

exports.upadateProduct = Factory_Handler.UpdateOneDoc(
  ProductyModule,
  "Products"
);

exports.createProduct = Factory_Handler.CreateDoc(ProductyModule, "Products");

exports.deleteProduct = Factory_Handler.DeleteOneDoc(ProductyModule);
