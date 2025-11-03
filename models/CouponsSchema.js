const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: [true, "Coupon name is required"],
      unique: true,
      trim: true,
      uppercase: true, // عشان الكود دايمًا يكون بشكل موحّد (WELCOME10 مثلاً)
    },
    expire: {
      type: Date,
      required: [true, "Coupon expire date is required"],
    },
    discount: {
      type: Number, // 👈 خليه رقم بدل String عشان الحسابات
      required: [true, "Discount value is required"],
      min: [1, "Discount can't be less than 1%"],
      max: [100, "Discount can't exceed 100%"],
    },
    isActive: {
      type: Boolean,
      default: true, // 👈 تقدر توقف الكوبون بدل ما تمسحه
    },
  },
  { timestamps: true }
);

const CouponModel = mongoose.model("Coupon", couponSchema);
module.exports = CouponModel;
