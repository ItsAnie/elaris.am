/**
 * Invitation Schema & Model Definition
 * Represents a digital invitation design in the ELARIS catalog.
 */
class InvitationModel {
  constructor(data) {
    this.id = data.id;
    this.title = data.title; // { hy: string, ru: string, en: string }
    this.category = data.category; // wedding, engagement, birthday, baptism, baby, corporate, anniversary, other
    this.price = data.price;
    this.image = data.image;
    this.previewUrl = data.previewUrl;
    this.description = data.description; // { hy: string, ru: string, en: string }
    this.features = data.features || [];
  }

  static validate(data) {
    const errors = [];
    if (!data.id) errors.push({ field: 'id', message: 'ID is required' });
    if (!data.title || typeof data.title !== 'object') errors.push({ field: 'title', message: 'Multilingual title is required' });
    if (!data.category) errors.push({ field: 'category', message: 'Category is required' });
    if (typeof data.price !== 'number') errors.push({ field: 'price', message: 'Valid price is required' });
    if (!data.previewUrl) errors.push({ field: 'previewUrl', message: 'Preview URL is required' });
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

module.exports = InvitationModel;
