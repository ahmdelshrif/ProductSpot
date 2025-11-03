const crypto = require(`crypto`);
const token = require(`jsonwebtoken`);
const bcrypt = require(`bcrypt`);
const SendEmail = require(`../Medileware/SendMail`);
const User = require("../models/UserSchema");
const asyncHandler = require("express-async-handler");
const ApiError = require(`../utils/apierror`);
const createToken = require(`../utils/createtoken`);

exports.SingUp = asyncHandler(async (req, res, next) => {
  // 1 Singup
  const user = await User.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    role: req.body.role,
  });
  // 2 genrat token
  const Token = createToken(user._id);
  res.status(201).json({
    status: "success",
    data: user,
    Token,
  });
});
exports.longin = asyncHandler(async (req, res, next) => {
  // 1 Singup
  const user = await User.findOne({
    email: req.body.email,
  });
  console.log(user);

  console.log(user);
  if (!user) {
    return next(new ApiError(`Email  Or password incorrect`));
  }
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return next(new ApiError("Email or password incorrect", 400));
  }
  // 2 genrat token
  const Token = createToken(user._id);
  res.status(201).json({
    status: "success",
    data: user,
    Token: Token,
  });
});

exports.Protect = asyncHandler(async (req, res, next) => {
  let Token;
  if (req.headers.authorization) {
    Token = req.headers.authorization.split(` `)[1];
  }
  if (!Token) {
    return next(new ApiError(` Must be login ..`, 400));
  }
  const decoded = token.verify(Token, process.env.jwt_sectkey);

  const user = await User.findOne({ _id: decoded.Userid });
  if (!user) {
    return next(new ApiError(`Token is valid  `, 400));
  }
  if (user.passwordChangedAt) {
    const passhangedTimestemp = user.passwordChangedAt.gitTime() / 1000;
    if (passhangedTimestemp > decoded.iat) {
      return next(
        new ApiError(
          `User recently changed his password , please login again `,
          400
        )
      );
    }
  }
  req.User = user;

  next();
});
exports.allowTo = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    // تأكد إن المستخدم متخزن من protect middleware
    if (!req.User) {
      return next(
        new ApiError("You must be logged in to access this route", 401)
      );
    }

    // تحقق من صلاحية المستخدم
    if (!roles.includes(req.User.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403)
      );
    }

    // السماح بالوصول
    next();
  });
};

exports.forgetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError(`Email is not registered with us`));
  }
  let restcode = Math.floor(Math.random() * 16777215).toString();
  const hasrestcode = crypto
    .createHash("sha256")
    .update(restcode)
    .digest("hex");
  user.passcode = hasrestcode;
  user.passcodeexpired = Date.now() + 10 * 60 * 1000;
  user.passcodeverfiy = false;
  user.save();
  try {
    await SendEmail({
      email: user.email,
      subject: "Password recovery confirmation code",
      text: `Your password recovery confirmation code is: ${restcode}`,
    });
  } catch (Err) {
    user.passcode = undefined;
    user.passcodeexpired = undefined;
    user.passcodeverfiy = undefined;
    user.save();
  }
  res.status(201).json({
    status: "success",
    message: "The confirmation code has been sent to your email successfully.",
  });
});

exports.Verfiycode = asyncHandler(async (req, res, next) => {
  let restcode = crypto
    .createHash("sha256")
    .update(req.body.restcode)
    .digest("hex");

  const user = await User.findOneAndUpdate({
    passcode: restcode,
    passcodeexpired: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ApiError(` restcode inncorect or The rescode expired ....`, 404)
    );
  }
  user.passcodeverfiy = true;
  await user.save();

  res.status(201).json({
    status: "success",
    message: "The restcode is successfully.",
  });
});

exports.respassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new ApiError(`Email is not registered with us`, 404));
  
  if (user.passcodeverfiy == false) {
    return next(new ApiError(`Rest Code not verify`, 404));
  }
  user.password = req.body.password;
  user.passcode = undefined;
  user.passcodeexpired = undefined;
  user.passcodeverfiy = undefined;
  user.save();
  res.status(201).json({
    status: "success",
    message: "The restcode is successfully.",
  });
});
