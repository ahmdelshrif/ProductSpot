const mongoose = require("mongoose");

const bcrypt = require(`bcrypt`);
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `Name is required`],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
    },
    passcode: String,
    passcodeexpired: Date,
    passcodeverfiy: Boolean,
    profileImage: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: `user`,
    },
    phone: Number,
    passwordChangedAt: Date,
    password: {
      type: String,
      required: [true, `password is required`],
      minlength: [8, `minlength for Password is 8 `],
    },
    active: {
      type: Boolean,
      default: true,
    },
    wishlist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: `Product`,
      },
    ],
    addresses: [
      {
        id: { type: mongoose.Schema.ObjectId },
        alias: String,
        details: String,
        phone: String,
        city: String,
        pastalcode: String,
      },
    ],
  },

  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10); // هنا لازم تكون this.password موجودة
  next();
});
Usermodels = mongoose.model(`User`, UserSchema);

module.exports = Usermodels;
