const mongoose = require("mongoose");
const productschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product msut be requiured"],
      unique: [true, "Product must be unique"],
      minlength: [2, "too short Product name"],
      maxlength: [100, "too long Product name"],
    },

    slug: {
      type: String,
      lowercase: true,
    },

    imageCover: {
      type: String,
    },

    images: [String],

    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must be belong to category"],
    },

    sold: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
      min: [20, "Too short product description "],
    },

    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "brand",
    },

    ratingsAverage: {
      type: Number,
      min: [0, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 5.0"],
    },

    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    colors: [String],

    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be positive"], // كفاية شرط إنه مايبقاش أقل من 0
    },

    priceAfterDiscount: {
      type: Number,
    },
    Currency: { type: String, default: `EGP` },

    Measurements: Number,
    unit: String,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Imageurl = (doc) => {
  if (doc.imageCover) {
    const Imageurl = `${process.env.Base_URL}/products/${doc.imageCover}`;
    doc.imageCover = Imageurl;
  }
  if (doc.images) {
    const imageslist = [];
    doc.images.forEach((element) => {
      const Imageurl = `${process.env.Base_URL}/products/${element}`;
      imageslist.push(Imageurl);
    });
    doc.images = imageslist;
  }
};

productschema.post(`init`, (doc) => {
  Imageurl(doc);
});

productschema.post(`save`, (doc) => {
  Imageurl(doc);
});

productschema.virtual(`reviews`, {
  ref: `review`,
  foreignField: `product`,
  localField: `_id`,
});

const productModels = mongoose.model("Product", productschema);
module.exports = productModels;
