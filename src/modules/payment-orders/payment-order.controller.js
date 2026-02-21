const PaymentService = require("./payment-order.service");

/**
 * @desc creates plan order and payments order
 *
 * Preconditions:-
 *  - request is authenticated
 *  - req.user.uid exists
 *  - req.body.plan is a valid
 *
 * @route /payments/create-order
 * @access Private
 */
const createOrderController = async (req, res) => {
  const { plan } = req.body;
  const { uid } = req.user;

  const order = await PaymentService.createOrder({ uid, plan });

  res.status(200).json(order);
};

/**
 * @desc verifies payments and confirms order
 * 
 * Preconditions:
 *  - request is authenticated
 *  - req.user.uid exists
 *  - req.body contains valid razorpayOrderId, razorpayPaymentId, razorpaySignature
 * 
 * @route /payments/verify-order
 * @access Private
 */
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
