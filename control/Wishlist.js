const asyncHandler = require("express-async-handler");
const wishlistyModule = require("../models/FavSchema");
const productmodel = require(`../models/ProductSchema`);
const apierror = require("../utils/apierror");

exports.AddTowishList = asyncHandler(async (req, res, next) => {
  const { productId, sessionId } = req.body;

  let Favproduct = await wishlistyModule.findOne({ sessionId });
  if (Favproduct) {
    let producids = Favproduct.wishlist.map((item) => {
      return item.productId.toString();
    });
    if (producids.includes(productId)) {
      return next(new apierror(`product is found`, 400));
    } else {
      Favproduct.wishlist.push({ productId });
      await Favproduct.save();
    }
  } else {
    Favproduct = await wishlistyModule.create({
      sessionId,
      wishlist: [{ productId }],
    });
  }

  res.status(200).json({
    message: "Product added successfully",
    data: Favproduct.wishlist,
  });
});

exports.RemovewishList = asyncHandler(async (req, res, next) => {
  const { sessionId } = req.body;
  const favproduct = await wishlistyModule.findOne({ sessionId });
  const favcart = favproduct.wishlist.filter(
    //هالتي ال اي دي اللي مش بيساوي ده
    (item) => item.productId.toString() !== req.params.productId
  );

  favproduct.wishlist = favcart;
  await favproduct.save();

  res
    .status(200)
    .json({ massege: `Remove succsfully`, data: favproduct.wishlist });
});

exports.getleggedwishList = asyncHandler(async (req, res, next) => {
  const Wishlister = await wishlistyModule.findOne({
    sessionId: req.body.sessionId,
  });
  res.status(200).json({ data: Wishlister.wishlist });
});
