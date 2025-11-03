const path = require(`path`);
const sharp = require(`sharp`);
const { uploadSinglefile } = require(`../Medileware/uploads`);
const { v4: uuidv4 } = require("uuid");
const Factory_Handler = require("./Factory_Handler");
const asyncHandler = require("express-async-handler");
const UsersyModule = require("../models/UserSchema");
const createToken = require(`../utils/createtoken`);
const ApiError = require(`../utils/apierror`);

const bcrypt = require(`bcrypt`);
exports.uploadUserimage = uploadSinglefile(`profileImage`);

exports.createUser = Factory_Handler.CreateDoc(UsersyModule, "user");

exports.resize = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
  const paths = path.join(__dirname, "../uploads/users");
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat(`jpeg`)
      .jpeg({ quality: 90 })
      .toFile(`${paths}/${filename}`);
    req.body.profileImage = filename;
  }
  next();
});

exports.getAllUser = Factory_Handler.getAllDoc(UsersyModule, "user");

exports.getUser = Factory_Handler.getDoc(UsersyModule);

exports.upadateUser = Factory_Handler.UpdateOneDoc(UsersyModule, "user");

exports.changepassword = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let Doc = await UsersyModule.findOneAndUpdate(
    { _id: id },
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    { new: true }
  );
  if (!Doc) {
    return next(new ApiError(` Not found 404 !!`, 404));
  }
  res.status(201).json({ Data: Doc });
});

exports.deleteUser = Factory_Handler.DeleteOneDoc(UsersyModule);

exports.getloggedUserdata = asyncHandler(async (req, res, next) => {
  req.params.id = req.User._id;

  next();
});

exports.getloggedUserupadtaPassword = asyncHandler(async (req, res, next) => {
  const id = req.User._id;
  let Doc = await UsersyModule.findOneAndUpdate(
    { _id: id },
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    { new: true }
  );
  let token = createToken(req.User._id);
  res.status(200).json({ data: Doc, token: token });
});

exports.updatemedata = asyncHandler(async (req, res, next) => {
  const user = UsersyModule.findOneAndUpdate(
    { _id: req.User._id },
    { email: req.body.email, name: req.body.name, phone: req.body.phone },
    { new: true }
  );
  res.status(200).json({ data: user });
});
exports.deactivate = asyncHandler(async (req, res, next) => {
  await UsersyModule.findOneAndUpdate(
    { _id: req.User._id },
    { active: false },
    { new: true }
  );
  res.status(200).json(`success`);
});
