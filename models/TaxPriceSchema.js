const mongoose = require("mongoose");

const TaxPriceSchema = new mongoose.Schema(
  {
    area: {
      type: String,
      required: [true, "Area is required"],
      unique: [true, "Category must be unique"],
      trim: true,
    },
    taxPrice: {
      type: Number,
      required: [true, "Tax price is required"],
      min: [0, "Tax price cannot be negative"],
    },
  },
  { timestamps: true }
);

const TaxPriceModel = mongoose.model("TaxPrice", TaxPriceSchema);
module.exports = TaxPriceModel;
