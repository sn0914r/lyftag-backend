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

  res.status(200).json({
    success: true,
    message: "Order created successfully",
    data: order,
  });
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
  const signature = req.headers["x-webhook-signature"];
  const timestamp = req.headers["x-webhook-timestamp"];
  const {
    data: {
      order: { order_id },
      payment: { payment_status },
    },
  } = req.body;

  const order = await PaymentService.verifyOrder({
    order_id,
    signature,
    timestamp,
    payment_status,
    rawBody: req.rawBody,
  });

  res.status(200).json({
    success: true,
    message: "Order verified successfully",
    data: order,
  });
};

module.exports = {
  createOrderController,
  verifyOrderController,
};
