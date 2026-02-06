const PaymentService = require("../services/payment.service");

const createOrderController = async (req, res) => {
  const { planId } = req.body;
  const { uid } = req.user;

  const order = await PaymentService.createOrder({ uid, planId });

  res.status(200).json(order);
};

const verifyOrderController = async (req, res) => {
  const { uid } = req.user;
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

  const order = await PaymentService.verifyOrder({
    uid,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  });

  res.status(200).json(order);
};

module.exports = { createOrderController, verifyOrderController };
