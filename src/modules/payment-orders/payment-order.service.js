const AppError = require("../../errors/AppError");
const crypto = require("crypto");

const { razorpayInstance } = require("../../configs/razorpay.config");
const { PLANS } = require("../../configs/plans.config");
const AuthDB = require("../auth/auth.db");
const OrdersDB = require("./order.db");
const ReferralService = require("../referrals/referral.service");

/**
 * @desc create orders
 *
 * Side Effects:-
 *  - Creates a payment order via Razorpay API
 *  - Saves the order record in DB
 *
 * @returns {<Promise {orderId: string, amount: number, razorpayOrderId: string}>}
 */
const createOrder = async ({ uid, plan }) => {
  const amount = PLANS[plan].price;

  const OPTIONS = {
    amount: amount * 100,
    currency: "INR",
    receipt: `order_rcptid_${Date.now()}`,
  };

  const order = await razorpayInstance.orders.create(OPTIONS);

  const orderId = await OrdersDB.createOrder({
    uid,
    plan,
    amount,
    razorpayOrderId: order.id,
    status: "PENDING",
  });

  return { orderId, amount: order.amount / 100, razorpayOrderId: order.id };
};

/**
 * @desc verifies payment, confirms orders, award the reffered user
 *
 * Side Effects:
 *  - updates the order status
 *  - updates the user document
 *  - update the referral amount
 *
 * @returns {<Promise { orderId: string, razorpayOrderId: string}>}
 */
const verifyOrder = async ({
  uid,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}) => {
  const order = await OrdersDB.getOrderByRazorpayOrderId(razorpayOrderId);
  if (!order) throw new AppError("Order not found", 404);
  if (order.uid !== uid) throw new AppError("Unauthorized", 401);

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");
  if (generatedSignature !== razorpaySignature)
    throw new AppError("Invalid payment", 400);

  await OrdersDB.updateOrder(razorpayOrderId, {
    razorpayPaymentId,
    status: "SUCCESS",
  });

  const user = await AuthDB.getUser(uid);
  if (!user) throw new AppError("User not found", 404);

  const isUpdated = await AuthDB.updateUser(uid, {
    planId: order.plan,
    planStatus: "ACTIVE",
    planExpiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
  });

  if (!isUpdated) throw new AppError("User not found", 404);

  await ReferralService.referralService({
    referredBy: user.referredBy,
    orderId: order.id,
    userId: uid,
  });

  return { orderId: order.id, razorpayOrderId: order.razorpayOrderId };
};

module.exports = { createOrder, verifyOrder };
