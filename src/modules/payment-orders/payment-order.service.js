const AppError = require("../../errors/AppError");
const crypto = require("crypto");

const { razorpayInstance } = require("../../configs/razorpay.config");
const { PLANS } = require("../../configs/plans.config");
const AuthDB = require("../auth/auth.db");
const OrdersDB = require("./order.db");
const ReferralService = require("../referrals/referral.service");
const { nanoid } = require("nanoid");

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

  // const OPTIONS = {
  //   amount: amount * 100,
  //   currency: "INR",
  //   receipt: `order_rcptid_${Date.now()}`,
  // };

  // const order = await razorpayInstance.orders.create(OPTIONS);

  // const orderId = await OrdersDB.createOrder({
  //   uid,
  //   plan,
  //   amount,
  //   razorpayOrderId: order.id,
  //   status: "PENDING",
  // });

  const baseUrl =
    process.env.CASHFREE_ENV === "production"
      ? "https://api.cashfree.com"
      : "https://sandbox.cashfree.com";

  const headers = {
    "Content-Type": "application/json",
    "x-client-id": process.env.CASHFREE_APP_ID,
    "x-client-secret": process.env.CASHFREE_SECRET_KEY,
    "x-api-version": "2022-09-01",
  };

  const body = JSON.stringify({
    order_id: `ORD_${nanoid(12)}`,
    order_amount: amount,
    order_currency: "INR",
    customer_details: {
      customer_id: uid,
      customer_email: "reddysivananda82@gmail.com",
      customer_phone: "9876543210",
    },
  });

  const response = await fetch(`${baseUrl}/pg/orders`, {
    method: "POST",
    headers,
    body,
  });
  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new AppError("Failed to create order", 500, "ORDER_CREATION_FAILED");
  }

  await OrdersDB.createOrder({
    uid,
    plan,
    amount,
    paymentOrderId: data.order_id,
    cfOrderId: data.cf_order_id,
  });

  return {
    orderId: data.cf_order_id,
    amount: data.order_amount,
    paymentOrderId: data.order_id,
    paymentSessionId: data.payment_session_id,
  };
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
  order_id,
  signature,
  timestamp,
  payment_status,
  rawBody,
}) => {
  const order = await OrdersDB.getOrderByRazorpayOrderId(order_id);
  if (!order) throw new AppError("Order not found", 404, "ORDER_NOT_FOUND");
  if (order.status === "SUCCESS") {
    return order;
  }

  const generatedSignature = crypto
    .createHmac("sha256", process.env.CASHFREE_SECRET_KEY)
    .update(timestamp + rawBody)
    .digest("base64");

  if (generatedSignature !== signature) {
    throw new AppError("Invalid signature", 400, "INVALID_SIGNATURE");
  }

  await OrdersDB.updateOrder(order_id, {
    status: payment_status,
  });

  const uid = order.uid;
  const user = await AuthDB.getUser(uid);
  if (!user) throw new AppError("User not found", 404, "USER_NOT_FOUND");

  const isUpdated = await AuthDB.updateUser(uid, {
    planId: order.plan,
    planStatus: "ACTIVE",
    planExpiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
  });

  if (!isUpdated) throw new AppError("User not found", 404, "USER_NOT_FOUND");

  await ReferralService.referralService({
    referredBy: user.referredBy,
    orderId: order_id,
    userId: uid,
  });

  console.log("Success");

  return { orderId: order_id, paymentOrderId: order.paymentOrderId };
};

module.exports = { createOrder, verifyOrder };
