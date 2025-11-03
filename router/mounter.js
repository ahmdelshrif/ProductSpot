const Categoryrouter = require("./Category-router");

const Barndsrouter = require("./Barnds-router");
const productrouter = require("./product-router");
const userrouter = require("./User-router");
const Authrouter = require("./Auth-router");
const Reviewrouter = require("./Review-router");
  
const coupontrouter = require("./coupons-router");
const TaxPrice = require(`./Taxprice-router`);
const Order = require(`./Order-router`);
const banner = require(`./banner-router`);
const wishlist = require(`./Wishlist-router`);
const Offer = require(`./offer-router`);

exports.mountrouter = (app) => {
  app.use("/api/v1/category", Categoryrouter);
  app.use("/api/v1/brand", Barndsrouter);
  app.use("/api/v1/product", productrouter);
  app.use("/api/v1/user", userrouter);
  app.use("/api/v1/auth", Authrouter);
  app.use("/api/v1/review", Reviewrouter);

  app.use("/api/v1/coupon", coupontrouter);
  app.use("/api/v1/taxprice", TaxPrice);
  app.use("/api/v1/order", Order);
  app.use("/api/v1/banner", banner);
  app.use("/api/v1/wishlist", wishlist);
  app.use("/api/v1/offer", Offer);
};
