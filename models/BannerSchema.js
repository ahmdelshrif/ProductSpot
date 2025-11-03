const mongoose = require("mongoose");

const Banner = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    images: [String],
  },
  { timestamps: true }
);

const bannersModles = mongoose.model("banner", Banner); // الأفضل تبدأ بحرف كبير

module.exports = bannersModles;
