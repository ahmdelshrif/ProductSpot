const mongoose = require("mongoose");

const Offers = new mongoose.Schema(
  {
    title: String,
    product: [
      {
        type: mongoose.Schema.ObjectId,
        ref: `Product`,
        required: [true, "product is required"],
      },
    ],
    quantityofproduct: Number,
    priceafterOffers: Number,
    totalprice: Number,
    expire: Date,
    image: {
      type: String,
      default: "لاتوجد صوره للاسف",
    },
  },

  { new: true }
);

OffersModel = mongoose.model(`offer`, Offers);

module.exports = OffersModel;
