const asyncHandler = require("express-async-handler");
const offermodel = require(`../models/offersShecma`);

const Ordermodels = require("../models/OrderSchema");
const ApiError = require(`../utils/apierror`);
const Taxpricmodels = require(`../models/TaxPriceSchema`);
const productmodel = require(`../models/ProductSchema`);
const { promises } = require("nodemailer/lib/xoauth2");
const Factory_Handler = require("./Factory_Handler");
const { uploadSinglefile } = require(`../Medileware/uploads`);
const CouponModel = require(`../models/CouponsSchema`);
const multer = require(`multer`);
const path = require(`path`);
const { v4: uuidv4 } = require("uuid");

uplodingimage = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const Path = path.join(__dirname, `../uploads/order`);
      cb(null, Path);
    },
    filename: function (req, file, cb) {
      const ext = file.mimetype.split("/")[1];
      const filename = `orders-${uuidv4()}-${Date.now()}.${ext}`;
      req.body.image = filename;
      cb(null, filename);
    },
  }),
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith(`image`)) {
      cb(null, true);
    } else {
      cb(new ApiError(`only image`, 400), false);
    }
  },
});
exports.uplodaingTransfer = uplodingimage.single(`image`);

exports.createOrder = asyncHandler(async (req, res, next) => {
  const { sessionId, address, paymentMethod, cupon, Area, image } = req.body;
  const cart = JSON.parse(req.body.cart);
  let offers = req.body.offers;
  console.log(offers);

  let totalprice = 0;
  // ✅ التحقق إن الكارت مش فاضي
  if (!cart || cart.length === 0) {
    return next(new ApiError(`Not found item in cart`, 400));
  }
  if (offers != undefined) {
    if (offers.length > 0) {
      offers = JSON.parse(req.body.offers);
      offers.map(async (element) => {
        const offer = await offermodel.findById(element.offer);
        console.log(offer);
        if (!offer) {
          return next(new ApiError(`offer not found`, 404));
        }
        const price = offer.totalprice;
        const itemTotal = price * element.quantity;
        totalprice += itemTotal;
        element.priceofpice = price;
      });
    }
  }

  // ✅ حساب السعر الإجمالي وتحديث الكمية
  await Promise.all(
    cart.map(async (element) => {
      const product = await productmodel.findById(element.product);
      if (!product) {
        return next(new ApiError(`Product not found`, 404));
      }

      // تحديث الكميات والمبيعات
      await productmodel.findByIdAndUpdate(
        element.product,
        {
          $inc: { quantity: -element.quantity, sold: element.quantity },
        },
        { new: true }
      );

      const price = product.priceAfterDiscount
        ? product.priceAfterDiscount
        : product.price;
      const itemTotal = price * element.quantity;
      totalprice += itemTotal;
      element.priceofpice = price;
    })
  );

  // ✅ التحقق من وجود كوبون (اختياري)
  let copuns = [];
  if (cupon) {
    const coupon = await CouponModel.findOne({ name: cupon });
    if (!coupon) {
      return next(new ApiError(`Coupon is invalid or not found`, 400));
    }

    // نجيب الأوردر الحالي بنفس الـsessionId
    const existingOrder = await Ordermodels.findOne({ sessionId });

    // لو فيه أوردر قبل كده بنفس الـsessionId
    if (existingOrder) {
      // نتأكد إن الكبون ما اتستخدمش قبل كده
      if (existingOrder.cuponarr.includes(cupon)) {
        return next(new ApiError(`This coupon already used before`, 400));
      }

      // نحسب الخصم ونضيف الكبون في المصفوفة
      totalprice = totalprice - (totalprice * coupon.discount) / 100;
      copuns = [...existingOrder.cuponarr, cupon];
      console.log(copuns);
    } else {
      // أول أوردر بالـsessionId ده
      totalprice = totalprice - (totalprice * coupon.discount) / 100;
      copuns.push(cupon);
      console.log(copuns);
    }
  }

  // ✅ حساب ضريبة أو رسوم التوصيل بناءً على المنطقة
  const tax = await Taxpricmodels.findOne({ area: Area });
  if (!tax) {
    return next(new ApiError(`No delivery available in this area`, 400));
  }

  totalprice += tax.taxPrice;
  if (paymentMethod == "card" && !image) {
    return next(new ApiError(`Send a picture of the transfer`, 400));
  }

  // ✅ إنشاء الأوردر الجديد
  const order = await Ordermodels.create({
    sessionId,
    CartItems: cart,
    taxPrice: tax.taxPrice,
    Totalprice: totalprice,
    paymentMethodType: paymentMethod || "cash",
    Address: address || {},
    cuponarr: copuns,
    totalPrice: totalprice,
    image: image,
    OfferItems: offers,
  });

  res.status(201).json({
    status: "success",
    message: "Order created successfully ",
    data: order,
  });
});

exports.GetAllOrder = Factory_Handler.getAllDoc(Ordermodels);

exports.getOrder = Factory_Handler.getDoc(Ordermodels);

exports.updatetoOrderpaid = asyncHandler(async (req, res, next) => {
  const Order = await Ordermodels.findById(req.params.id);
  if (!Order) {
    return next(new ApiError(`no Id with Order`, 400));
  }
  Order.isPaid = true;
  Order.paidAt = Date.now();

  const OrderAfterUpdate = await Order.save();

  res.status(200).json({
    status: "success",
    massege: `upodateorder is successfuly`,
    data: OrderAfterUpdate,
  });
});

exports.updatetoOrderdelivered = asyncHandler(async (req, res, next) => {
  const Order = await Ordermodels.findById(req.params.id);
  if (!Order) {
    return next(new ApiError(`no Id with Order`, 400));
  }
  Order.isDelivered = true;
  Order.deliveredAt = Date.now();

  const OrderAfterUpdate = await Order.save();
  res.status(200).json({
    status: "success",
    massege: `upodateorder is successfuly`,
    data: OrderAfterUpdate,
  });
});

exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Ordermodels.findById(req.params.id);

  if (!order) {
    return next(new ApiError("Order not found", 404));
  }

  // لو الطلب تم تسليمه
  if (order.isDelivered) {
    return next(
      new ApiError(
        "The order cannot be deleted after it has been delivered.",
        400
      )
    );
  }

  await Ordermodels.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "The request was successfully deleted ",
  });
});
