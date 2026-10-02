const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Fetch all invitations from backend with optional category filter
 */
export async function fetchInvitations(category = '') {
  try {
    const url = category && category !== 'all' 
      ? `${API_BASE_URL}/api/invitations?category=${encodeURIComponent(category)}`
      : `${API_BASE_URL}/api/invitations`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch invitations: ${response.status}`);
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.warn('API error, falling back to local static catalog:', error);
    return null; // Signals component to use bundled static data
  }
}

/**
 * Submit an invitation order to backend
 */
export async function submitOrder(orderData) {
  const response = await fetch(`${API_BASE_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || 'Failed to submit order');
  }
  return result;
}

/**
 * Submit contact inquiry to backend
 */
export async function submitContact(contactData) {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactData),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || 'Failed to send message');
  }
  return result;
}
