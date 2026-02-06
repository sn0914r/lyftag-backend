const { db } = require("../configs/firebase.config");
const AppError = require("../errors/AppError");

const COLLECTION_NAME = "orders";
const createOrder = async ({
  uid,
  planId,
  amount,
  razorpayOrderId,
  status,
}) => {
  const orderDocument = await db.collection(COLLECTION_NAME).add({
    uid,
    planId,
    amount,
    razorpayOrderId,
    status,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  return orderDocument.id;
};

const getOrderByRazorpayOrderId = async (razorpayOrderId) => {
  const orderDocument = await db
    .collection(COLLECTION_NAME)
    .where("razorpayOrderId", "==", razorpayOrderId)
    .get();

  if (orderDocument.empty) throw new AppError("Order not found", 404);

  const doc = orderDocument.docs[0];
  return { id: doc.id, ...doc.data() };
};

const updateOrder = async (razorpayOrderId, { razorpayPaymentId, status }) => {
  const orderDocument = await db
    .collection(COLLECTION_NAME)
    .where("razorpayOrderId", "==", razorpayOrderId)
    .get();
  if (orderDocument.empty) throw new AppError("Order not found", 404);

  return orderDocument.docs[0].ref.update({
    razorpayPaymentId,
    status,
    updatedAt: Date.now(),
  });
};
module.exports = { createOrder, getOrderByRazorpayOrderId, updateOrder };
