const { razorpayInstance } = require("../configs/razorpay.config");
const { PLANS } = require("../configs/plans.config");
const OrdersDB = require("../db/order.db");
const UsersDB = require("../db/user.db");

const AppError = require("../errors/AppError");
const crypto = require("crypto");

const ReferalService = require("./referal.service");

const createOrder = async ({ uid, planId }) => {
  const amount = PLANS[planId].price;

  const OPTIONS = {
    amount: amount * 100,
    currency: "INR",
    receipt: `order_rcptid_${Date.now()}`,
  };

  const order = await razorpayInstance.orders.create(OPTIONS);

  const orderId = await OrdersDB.createOrder({
    uid,
    planId,
    amount,
    razorpayOrderId: order.id,
    status: "PENDING",
  });

  return { orderId, amount: order.amount / 100, razorpayOrderId: order.id };
};

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

  const user = await UsersDB.getUser(uid);

  await UsersDB.updateUser(uid, {
    planId: order.planId,
    planStatus: "ACTIVE",
    planExpiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
  });

  await ReferalService.referralService(user.referredBy, order.id);

  return { orderId: order.id, razorpayOrderId: order.razorpayOrderId };
};

module.exports = { createOrder, verifyOrder };
