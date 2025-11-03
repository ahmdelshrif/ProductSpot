const Factory_Handler = require("./Factory_Handler");

const couponyModule = require("../models/CouponsSchema");

exports.createCoupon = Factory_Handler.CreateDoc(couponyModule, "Brands");

exports.getAllCoupon = Factory_Handler.getAllDoc(couponyModule, "Brands");

exports.getCoupon = Factory_Handler.getDoc(couponyModule);

exports.upadateCoupon = Factory_Handler.UpdateOneDoc(couponyModule, "Brands");

exports.deleteCoupon = Factory_Handler.DeleteOneDoc(couponyModule);
