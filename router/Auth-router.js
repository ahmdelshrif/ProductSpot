const express = require("express");
const {
  singupValidator,
  LoginValidator,
  respasswordValidator,
} = require(`../utils/Authvalidator`);
const router = express.Router();
const {
  SingUp,
  longin,
  forgetPassword,
  Verfiycode,
  respassword,
} = require("../control/auth");

router.route("/singup").post(singupValidator, SingUp);
router.route("/login").post(LoginValidator, longin);
router.post(`/forgetpassword`, forgetPassword);
router.post(`/verfiyCode`, Verfiycode);
router.post(`/respassword`, respasswordValidator, respassword);
//   .get(getAllUser);

// router
//   .route("/:id")
//   .get(getUserValidator, getUser)

//   .put(uploadUserimage, resize.apply, updateUserValidator, upadateUser)

//   .delete(deleteUserValidator, deleteUser);
// router.put(`/changepassword/:id`, ChanePasswordValidator, changepassword);

module.exports = router;
