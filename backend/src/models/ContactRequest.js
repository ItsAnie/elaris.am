/**
 * Contact Request Schema & Model
 */
class ContactRequestModel {
  constructor(data) {
    this.name = data.name;
    this.email = data.email || null;
    this.phone = data.phone;
    this.message = data.message;
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  static validate(data) {
    const errors = [];
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
      errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
    }
    if (!data.phone && !data.email) {
      errors.push({ field: 'contact', message: 'Either phone number or email is required' });
    }
    if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 5) {
      errors.push({ field: 'message', message: 'Message must be at least 5 characters long' });
    }
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

module.exports = ContactRequestModel;
