const mongoose = require("mongoose");
const products = require(`./ProductSchema`);

const ReviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    rating: {
      type: Number,
      min: [1, "too short rating"],
      max: [5, "too long rating"],
    },
    name: {
      type: String,
      default: "زائر",
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: `Product`,
      required: [true, "product is required"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Populate المنتج فقط
ReviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
    select: "title price",
  });
  next();
});

// حساب متوسط التقييمات وعددها
ReviewSchema.statics.CountityAvaragerating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(productId) } },
    {
      $group: {
        _id: `product`,
        ratingAverage: { $avg: "$rating" },
        ratingQuantity: { $sum: 1 },
      },
    },
  ]);

  if (result.length > 0) {
    await products.findOneAndUpdate(
      { _id: productId },
      {
        ratingsAverage: result[0].ratingAverage,
        ratingsQuantity: result[0].ratingQuantity,
      }
    );
  } else {
    await products.findOneAndUpdate(
      { _id: productId },
      {
        ratingsAverage: 0,
        ratingsQuantity: 0,
      },
      { new: true }
    );
  }
};

// بعد الحفظ أو الحذف نحسب التقييمات
ReviewSchema.post("save", async function () {
  await this.constructor.CountityAvaragerating(this.product);
});

ReviewSchema.post("findOneAndDelete", async function (doc) {
  if (doc) await doc.constructor.CountityAvaragerating(doc.product);
});

const ReviewModel = mongoose.model(`review`, ReviewSchema);
module.exports = ReviewModel;
