const db = require('../config/db');
const OrderModel = require('../models/Order');

exports.createOrder = async (req, res, next) => {
  try {
    const {
      name,
      brideName,
      groomName,
      phone,
      email,
      eventType,
      preferredInvitation,
      package: pkg,
      eventDate,
      message
    } = req.body;

    const validation = OrderModel.validate({
      name,
      brideName,
      groomName,
      phone,
      email,
      eventType,
      preferredInvitation,
      package: pkg,
      eventDate,
      message
    });

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validation.errors
      });
    }

    const orderData = new OrderModel({
      name,
      brideName,
      groomName,
      phone,
      email,
      eventType,
      preferredInvitation: preferredInvitation || 'Default',
      package: pkg || 'Elegant',
      eventDate: eventDate || null,
      message: message ? message.trim() : ''
    });

    const newOrder = await db.orders.create({
      name: orderData.name,
      brideName: orderData.brideName,
      groomName: orderData.groomName,
      phone: orderData.phone.trim(),
      email: orderData.email ? orderData.email.trim() : null,
      eventType: orderData.eventType,
      preferredInvitation: orderData.preferredInvitation,
      package: orderData.package,
      eventDate: orderData.eventDate,
      message: orderData.message
    });

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: newOrder
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await db.orders.find();
    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    next(err);
  }
};
