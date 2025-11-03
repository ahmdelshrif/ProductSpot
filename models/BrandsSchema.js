const mongoose = require("mongoose");

const Brand = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand is required"],
      unique: [true, "Brand must be unique"],
      minlength: [3, "too short Brand name"],
      maxlength: [32, "too long Brand name"],
    },

    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const Imageurl = (doc) => {
  const Imageurl = `${process.env.Base_URL}/category/${doc.image}`;
  doc.image = Imageurl;
};

Brand.post(`init`, (doc) => {
  Imageurl(doc);
});

Brand.post(`save`, (doc) => {
  Imageurl(doc);
});

const BrandsModles = mongoose.model("brand", Brand); // الأفضل تبدأ بحرف كبير

module.exports = BrandsModles;
