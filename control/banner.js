const bannerModule = require("../models/BannerSchema");
const Factory_Handler = require("./Factory_Handler");
const sharp = require(`sharp`);
const ApiError = require(`../utils/apierror`);
const { v4: uuidv4 } = require("uuid");

const path = require(`path`);
const asyncHandler = require("express-async-handler");
const multer = require("multer");



const filter = (req, file, cb) => {
  if (file.mimetype.startsWith(`image`)) {
    cb(null, true);
  } else {
    cb(new ApiError(`only image`, 400), false);
  }
};
const uplodsphoto = multer({
  storage: multer.memoryStorage(),
  fileFilter: filter,
});

exports.uploadsfile = uplodsphoto.fields([{ name: `images`, maxCount: 5 }]);
exports.raizon = asyncHandler(async (req, res, next) => {
  const images = [];
  if (!req.files) {
    return next();
  } else {
    await Promise.all(
      req.files.images.map(async (file) => {
        const paths = path.join(__dirname, "../uploads/banner");
        const filename = `banner-${uuidv4()}-${Date.now()}.jpeg`;
        await sharp(file.buffer)
          .resize(600, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`${paths}/${filename}`);

        images.push(filename);
      })
    );
    req.body.images = images;
    next();
  }
});

// exports.uploadbannersimage = uploadMaxOFfiles([
//   {
//     name: `images`,
//     maxCount: 5,
//   },
// ]);

// exports.resize = asyncHandler(async (req, res, next) => {
//   // لو مفيش ملفات أو مفيش imageCover متتبعتش الصورة
//   if (!req.files || !req.files.images) {
//     return next();
//   }
//   if (req.files.images) {
//     req.body.images = [];
//     await Promise.all(
//       req.files.images.map((item) => {
//         if (item.buffer) {
//           const filename = `banner-${uuidv4()}-${Date.now()}.jpeg`;
//           const paths = path.join(__dirname, "../uploads/banner");
//           return sharp(item.buffer)
//             .resize(600, 1333)
//             .toFormat(`jpeg`)
//             .jpeg({ quality: 90 })
//             .toFile(`${paths}/${filename}`)
//             .then(() => {
//               req.body.images.push(filename);
//             });
//         }
//       })
//     );
//   }
//   next();
// });

exports.createBanner = Factory_Handler.CreateDoc(bannerModule, "banner");

exports.getAllBanner = Factory_Handler.getAllDoc(bannerModule, "banner");

exports.upadateBanner = Factory_Handler.UpdateOneDoc(bannerModule, "banner");

exports.getBanner = Factory_Handler.getDoc(bannerModule);

exports.deleteBanner = Factory_Handler.DeleteOneDoc(bannerModule);
