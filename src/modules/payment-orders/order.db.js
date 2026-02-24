const { db } = require("../../configs/firebase.config");
const AppError = require("../../errors/AppError");

const COLLECTION_NAME = "orders";

/**
 * @desc creates order
 *
 * @returns {Promise<void>}
 */
const createOrder = async ({
  uid,
  plan,
  amount,
  paymentOrderId,
  cfOrderId,
}) => {
  await db.collection(COLLECTION_NAME).doc(paymentOrderId).set({
    uid,
    plan,
    amount,
    paymentOrderId,
    status: "PENDING",
    cfOrderId,
    createdAt: Date.now(),
  });

  return;
};

/**
 * @desc gets order by razorpayOrderId
 *
 * @returns {Promise<object>} Order details
 */
const getOrderByRazorpayOrderId = async (orderId) => {
  const orderDocument = await db.collection(COLLECTION_NAME).doc(orderId).get();

  if (!orderDocument.exists) throw new AppError("Order not found", 404);

  return { id: orderDocument.id, ...orderDocument.data() };
};

/**
 * @desc updates order
 *
 * @returns {Promise<void>}
 */
const updateOrder = async (orderId, { status }) => {
  const orderDocument = await db.collection(COLLECTION_NAME).doc(orderId).get();
  if (!orderDocument.exists) throw new AppError("Order not found", 404);

  await orderDocument.ref.update({
    status,
    updatedAt: Date.now(),
  });

  return;
};

module.exports = { createOrder, getOrderByRazorpayOrderId, updateOrder };
