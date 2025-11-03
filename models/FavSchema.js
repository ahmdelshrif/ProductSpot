// models/favoriteModel.js
const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String, // بنخزن معرف فريد للزائر (ممكن ييجي من localStorage أو cookies)
      required: true,
    },
    wishlist: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        addedAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

const favoriteModel = mongoose.model("Favorite", favoriteSchema);
module.exports = favoriteModel;
