const asyncHandler = require("express-async-handler");
const OffersModule = require("../models/offersShecma");
const ProductModule = require("../models/ProductSchema");
const multer = require(`multer`);
const path = require(`path`);
const { v4: uuidv4 } = require("uuid");
const ApiError = require(`../utils/apierror`);

uplodingimage = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const Path = path.join(__dirname, `../uploads/offer`);
      cb(null, Path);
    },
    filename: function (req, file, cb) {
      const ext = file.mimetype.split("/")[1];
      const filename = `offer-${uuidv4()}-${Date.now()}.${ext}`;
      req.body.image = filename;
      cb(null, filename);
    },
  }),
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith(`image`)) {
      cb(null, true);
    } else {
      cb(new ApiError(`only image`, 400), false);
    }
  },
});
exports.uplodaingTransfer = uplodingimage.single(`image`);

exports.CreateOffers = asyncHandler(async (req, res, next) => {
  let { produuts, title, totalprice, expire } = req.body;

  const checkoffer = await OffersModule.findOne({ title });
  if (checkoffer) {
    return next(new ApiError(`This offer is available`, 400));
  }
  let totalpriceafterOffers = 0;
  await Promise.all(
    produuts.map(async (item) => {
      const products = await ProductModule.findById(item);
      if (!products) {
        return next(new ApiError("This product is not available.", 400));
      }
      const price = products.priceAfterDiscount
        ? products.priceAfterDiscount
        : products.price;
      const itemTotal = price * item.quantity;
      totalpriceafterOffers += itemTotal;
      element.price = price;
    })
  );

  const OffersM = await OffersModule.create({
    product: produuts,
    title,
    quantityofproduct: produuts.length,
    priceafterOffers: totalpriceafterOffers,
    totalprice,
    image: req.body.image,
    expire,
  });
  res.status(200).json({ massege: `success`, data: OffersM });
});
exports.getAlloffer = asyncHandler(async (req, res, next) => {
  const OffersM = await OffersModule.find();
  if (!OffersM) {
    return next(new ApiError("There are no offers", 400));
  }
  res.status(200).json({ massege: `success`, data: OffersM });
});

exports.getoffer = asyncHandler(async (req, res, next) => {
  const OffersM = await OffersModule.findById(req.params.id);
  if (!OffersM) {
    return next(new ApiError("There are no offers", 400));
  }
  res.status(200).json({ massege: `success`, data: OffersM });
});

exports.updateOfers = asyncHandler(async (req, res, next) => {
  const OffersM = await OffersModule.findAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!OffersM) {
    return next(new ApiError(`There are no offers`, 400));
  }
  res.status(200).json({ massege: `success`, data: OffersM });
});
