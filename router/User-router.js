const express = require("express");
const {
  getUserValidator,
  deleteUserValidator,
  creatUserValidator,
  updateUserValidator,
  ChanePasswordValidator,
} = require(`../utils/UserVaildator`);
const router = express.Router();
const {
  getAllUser,
  createUser,
  getUser,
  upadateUser,
  deleteUser,
  uploadUserimage,
  resize,
  changepassword,
  getloggedUserdata,
  getloggedUserupadtaPassword,
  updatemedata,
  deactivate,
} = require("../control/user");

const Auth = require(`../control/auth`);

router.get(`/getme`, Auth.Protect, getloggedUserdata, getUser);
router.put(`/updatemepassword`, Auth.Protect, getloggedUserupadtaPassword);
router.put(`/updatemedata`, updateUserValidator, Auth.Protect, updatemedata);
router.put(`/deactiveeme`, Auth.Protect, deactivate);
router
  .route("/")
  .post(
    Auth.Protect,
    Auth.allowTo("admin"),
    uploadUserimage,
    resize,
    creatUserValidator,
    createUser
  )

  .get(Auth.Protect, Auth.allowTo("admin"), getAllUser);

router
  .route("/:id")
  .get(Auth.Protect, Auth.allowTo("admin"), getUserValidator, getUser)

  .put(
    Auth.Protect,
    Auth.allowTo("admin"),
    uploadUserimage,
    resize.apply,
    updateUserValidator,
    upadateUser
  )

  .delete(Auth.allowTo("admin"), deleteUserValidator, deleteUser);
router.put(`/changepassword/:id`, ChanePasswordValidator, changepassword);

module.exports = router;
