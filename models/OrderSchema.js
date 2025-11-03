const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: [true, "Session ID is required"], // 👈 ده بييجي من الفرونت localStorage
    },
    CartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: [true, "Product is required"],
        },
        priceofpice: Number,
        quantity: { type: Number, default: 1 },
        color: { type: String, default: "no color" },
      },
    ],
    OfferItems: [
      {
        offer: {
          type: mongoose.Schema.ObjectId,
          ref: "offer",
        },
        quantity: { type: Number, default: 1 },
        priceofpice: Number,
      },
    ],

    cupon: String,
    cuponarr: [String],
    taxPrice: { type: Number, default: 0 },
    totalPrice: Number,
    shippingPrice: { type: Number, default: 0 },
    paymentMethodType: {
      type: String,
      enum: ["card", "cash"],
      default: "cash",
    },
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
    isDelivered: { type: Boolean, default: false },
    deliveredAt: Date,
    address: {
      alias: String,
      details: String,
      phone: String,
      city: String,
    },
    image: { type: String },
  },
  { timestamps: true }
);

// populate المنتجات فقط
OrderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "CartItems.product",
    select:
      "title imageCover ratingsAverage quantity price priceAfterDiscount ",
  }).populate({
    path: "OfferItems",
  });
  next();
});
OrderSchema.pre("save", async function (next) {
  await this.populate({
    path: "CartItems.product",
    select: "title imageCover ratingsAverage quantity price priceAfterDiscount",
  });

  await this.populate({
    path: "OfferItems.offer",
  });

  next();
});

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;
