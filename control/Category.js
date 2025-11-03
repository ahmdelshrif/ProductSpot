const Factory_Handler = require("./Factory_Handler");
const path = require(`path`);
const sharp = require(`sharp`);
const { uploadSinglefile } = require(`../Medileware/uploads`);
const { v4: uuidv4 } = require("uuid");
const CategoryModule = require("../models/CategorySchema");
const apierror = require(`../utils/apierror`);

exports.uploadcategoryimage = uploadSinglefile(`image`);

exports.createCategory = Factory_Handler.CreateDoc(CategoryModule, "Category");

exports.resize = async (req, res, next) => {
  if (!req.file.buffer) return new apierror(`not found photo`, 400);
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  const paths = path.join(__dirname, "../uploads/category");
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`${paths}/${filename}`);
  req.body.image = filename;
  next();
};

exports.getAllCategory = Factory_Handler.getAllDoc(CategoryModule, "Category");

exports.getCategory = Factory_Handler.getDoc(CategoryModule);

exports.upadateCategory = Factory_Handler.UpdateOneDoc(
  CategoryModule,
  "Category"
);

exports.deletCategory = Factory_Handler.DeleteOneDoc(CategoryModule);
