const express = require("express");
const { createPaymentIntent } = require("../controllers/payment");
const { verifyToken } = require("../utils/verifyToken");
const router = express.Router();

router.post("/create-payment-intent", verifyToken, createPaymentIntent);
module.exports = router;
