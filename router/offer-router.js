const express = require("express");

const router = express.Router();
const {
  CreateOffers,
  getAlloffer,
  getoffer,
  updateOfers,
  uplodaingTransfer,
} = require("../control/Offers");

const Auth = require(`../control/auth`);
router.use(Auth.Protect, Auth.allowTo("admin"));
router.route("/").post(uplodaingTransfer, CreateOffers).get(getAlloffer);
router.route("/:id").get(getoffer);

router.route("/:id").put(updateOfers);

module.exports = router;
