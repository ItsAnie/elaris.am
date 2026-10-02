const db = require('../config/db');
const ContactRequestModel = require('../models/ContactRequest');

exports.createContactRequest = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;

    const validation = ContactRequestModel.validate({ name, email, phone, message });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validation.errors
      });
    }

    const newContact = await db.contactRequests.create({
      name: name.trim(),
      email: email ? email.trim() : null,
      phone: phone ? phone.trim() : null,
      message: message.trim()
    });

    return res.status(201).json({
      success: true,
      message: 'Contact message received successfully',
      data: newContact
    });
  } catch (err) {
    next(err);
  }
};
