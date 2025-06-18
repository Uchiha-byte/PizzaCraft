import { API_URL, PIZZA_OPTIONS } from './config';

export const getAuthHeaders = (token: string | null) => {
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export interface InventoryItem {
  _id: string;
  type: 'base' | 'sauce' | 'cheese' | 'veggie';
  name: string;
  description: string;
  imageUrl?: string;
  price: number;
  currentStock: number;
  thresholdLevel: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderResponse {
  _id: string;
  userId: string;
  items: Array<{
    base: { id: string; name: string; price: number };
    sauce: { id: string; name: string; price: number };
    cheese: { id: string; name: string; price: number };
    veggies: Array<{ id: string; name: string; price: number }>;
  }>;
  totalAmount: number;
  paymentId?: string;
  status: 'received' | 'in-kitchen' | 'out-for-delivery' | 'delivered';
  createdAt: string;
  updatedAt: string;
}

// Mock inventory data until backend is ready
export const fetchInventory = async (type?: string): Promise<InventoryItem[]> => {
  // Return mock data based on type
  switch (type) {
    case 'base':
      return PIZZA_OPTIONS.bases.map(base => ({
        _id: base.id,
        type: 'base',
        name: base.name,
        description: base.description,
        price: base.price,
        currentStock: 100,
        thresholdLevel: 10,
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
    case 'sauce':
      // Mock sauce data
      return [
        {
          _id: 'tomato',
          type: 'sauce',
          name: 'Tomato Sauce',
          description: 'Classic tomato sauce',
          price: 39,
          currentStock: 100,
          thresholdLevel: 10,
          isAvailable: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'pesto',
          type: 'sauce',
          name: 'Pesto Sauce',
          description: 'Fresh basil pesto',
          price: 59,
          currentStock: 100,
          thresholdLevel: 10,
          isAvailable: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'whitesauce',
          type: 'sauce',
          name: 'White Sauce',
          description: 'Creamy Alfredo sauce',
          price: 49,
          currentStock: 100,
          thresholdLevel: 10,
          isAvailable: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
    case 'cheese':
      // Mock cheese data
      return [
        {
          _id: 'mozzarella',
          type: 'cheese',
          name: 'Mozzarella',
          description: 'Classic pizza cheese',
          price: 69,
          currentStock: 100,
          thresholdLevel: 10,
          isAvailable: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'cheddar',
          type: 'cheese',
          name: 'Cheddar',
          description: 'Sharp cheddar cheese',
          price: 79,
          currentStock: 100,
          thresholdLevel: 10,
          isAvailable: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'parmesan',
          type: 'cheese',
          name: 'Parmesan',
          description: 'Aged Parmesan cheese',
          price: 89,
          currentStock: 100,
          thresholdLevel: 10,
          isAvailable: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
    case 'veggie':
      return PIZZA_OPTIONS.veggies.map(veggie => ({
        _id: veggie.id,
        type: 'veggie',
        name: veggie.name,
        description: veggie.description,
        price: veggie.price,
        currentStock: 100,
        thresholdLevel: 10,
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
    default:
      return [];
  }
};

// Order APIs
export const createOrder = async (orderData: any, token: string) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(orderData)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create order');
  }
  
  return response.json();
};

export const fetchUserOrders = async (token: string) => {
  const response = await fetch(`${API_URL}/orders/user`, {
    headers: getAuthHeaders(token)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch orders');
  }
  
  return response.json();
};

export const fetchOrderDetails = async (orderId: string, token: string) => {
  const response = await fetch(`${API_URL}/orders/${orderId}`, {
    headers: getAuthHeaders(token)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch order details');
  }
  
  return response.json();
};

// Payment APIs
export const createPaymentOrder = async (amount: number, token: string) => {
  const response = await fetch(`${API_URL}/payments/create-order`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ amount })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create payment order');
  }
  
  return response.json();
};

export const verifyPayment = async (paymentData: any, token: string) => {
  const response = await fetch(`${API_URL}/payments/verify`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(paymentData)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to verify payment');
  }
  
  return response.json();
};