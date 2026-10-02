/**
 * Order Schema & Model Definition
 * Represents a digital invitation customization order placed by a customer.
 */
class OrderModel {
  constructor(data) {
    this.name = data.name || (data.brideName && data.groomName ? `${data.brideName.trim()} & ${data.groomName.trim()}` : '');
    this.brideName = data.brideName ? data.brideName.trim() : null;
    this.groomName = data.groomName ? data.groomName.trim() : null;
    this.phone = data.phone;
    this.email = data.email || null;
    this.eventType = data.eventType;
    this.preferredInvitation = data.preferredInvitation || null;
    this.package = data.package || null;
    this.eventDate = data.eventDate || null;
    this.message = data.message || '';
    this.status = data.status || 'pending';
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  static validate(data) {
    const errors = [];
    const isWeddingOrEngagement = data.eventType === 'wedding' || data.eventType === 'engagement';

    if (isWeddingOrEngagement) {
      if (!data.brideName || typeof data.brideName !== 'string' || data.brideName.trim().length < 2) {
        errors.push({ field: 'brideName', message: "Bride's name is required (minimum 2 characters)" });
      }
      if (!data.groomName || typeof data.groomName !== 'string' || data.groomName.trim().length < 2) {
        errors.push({ field: 'groomName', message: "Groom's name is required (minimum 2 characters)" });
      }
    } else {
      if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
        errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
      }
    }

    if (!data.phone || typeof data.phone !== 'string' || data.phone.trim().length < 5) {
      errors.push({ field: 'phone', message: 'A valid phone number is required' });
    }
    if (!data.eventType || typeof data.eventType !== 'string') {
      errors.push({ field: 'eventType', message: 'Event type is required' });
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push({ field: 'email', message: 'Invalid email address format' });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

module.exports = OrderModel;
