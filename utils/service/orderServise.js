const Cart = require("../../models/cartModels");
const Product = require("../../models/productModel");
const Order = require("../../models/orderModel");
const cartServise = require("./cartServise");
const { ErrorHandler } = require("../helpers/errorHelper");

exports.getAllOrders = async (userId) => {
  return await Order.find({ userId });
};
exports.getOrderById = async (orderId) => {
  return await Order.findById(orderId);
};

exports.creatOrders = async (products, userId) => {
  return await Order.create({
    products,
    userId,
  });
};
exports.updeteOrders = async (userId) => {
  return await Cart.findOneAndUpdate({ userId });
};

exports.deleteOrders = async (orderId) => {
  return await Order.findOneAndDelete({ _id: orderId });
};

exports.createOrderForSingelProduct = async (userId) => {
  const stock = await Product.findById(data.productId);

  if (data.quantity > stock.quantity)
    throw new ErrorHandler(200, "Product is out of stock");

  const order = await Order.create(data);
  await cartServise.RemoveProductfromeCart(data.userId, data.productId);

  const update = { quantity: stock.quantity - data.quantity };

  await Product.findByIdAndUpdate(stock.id, update, { new: true });

  return order;
};
