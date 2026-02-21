const { db } = require("../../configs/firebase.config");
const AppError = require("../../errors/AppError");

const COLLECTION_NAME = "orders";

/**
 * @desc creates order
 *
 * @returns {Promise<string>}
 */
const createOrder = async ({ uid, plan, amount, razorpayOrderId, status }) => {
  const orderDocument = await db.collection(COLLECTION_NAME).add({
    uid,
    plan,
    amount,
    razorpayOrderId,
    status,

    createdAt: Date.now(),
  });

  return orderDocument.id;
};

/**
 * @desc gets order by razorpayOrderId
 *
 * @returns {Promise<object>} Order details
 */
const getOrderByRazorpayOrderId = async (razorpayOrderId) => {
  const orderDocument = await db
    .collection(COLLECTION_NAME)
    .where("razorpayOrderId", "==", razorpayOrderId)
    .get();

  if (orderDocument.empty) throw new AppError("Order not found", 404);

  const doc = orderDocument.docs[0];
  return { id: doc.id, ...doc.data() };
};

/**
 * @desc updates order
 *
 * @returns {Promise<void>}
 */
const updateOrder = async (razorpayOrderId, { razorpayPaymentId, status }) => {
  const orderDocument = await db
    .collection(COLLECTION_NAME)
    .where("razorpayOrderId", "==", razorpayOrderId)
    .get();
  if (orderDocument.empty) throw new AppError("Order not found", 404);

  await orderDocument.docs[0].ref.update({
    razorpayPaymentId,
    status,
    updatedAt: Date.now(),
  });

  return;
};

module.exports = { createOrder, getOrderByRazorpayOrderId, updateOrder };
