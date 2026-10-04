const db = require('./firebase');

const invitationsCollection = db.collection('invitations');
const ordersCollection = db.collection('orders');
const contactRequestsCollection = db.collection('contact_requests');

const invitations = {
  find: async (query = {}) => {
    let ref = invitationsCollection;

    if (query.category && query.category !== 'all') {
      ref = ref.where('category', '==', query.category.toLowerCase());
    }

    const snapshot = await ref.get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  findById: async (id) => {
    const doc = await invitationsCollection.doc(id).get();

    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...doc.data()
    };
  }
};

const orders = {
  create: async (orderData) => {
    const docRef = ordersCollection.doc();

    const newOrder = {
      id: docRef.id,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    await docRef.set(newOrder);

    return newOrder;
  },

  find: async () => {
    const snapshot = await ordersCollection.get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  findById: async (id) => {
    const doc = await ordersCollection.doc(id).get();

    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...doc.data()
    };
  }
};

const contactRequests = {
  create: async (contactData) => {
    const docRef = contactRequestsCollection.doc();

    const newContact = {
      id: docRef.id,
      ...contactData,
      createdAt: new Date().toISOString()
    };

    await docRef.set(newContact);

    return newContact;
  },

  find: async () => {
    const snapshot = await contactRequestsCollection.get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
};

module.exports = {
  invitations,
  orders,
  contactRequests
};