import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { createPaymentOrder, verifyPayment, createOrder } from '../utils/api';
import { RAZORPAY_KEY_ID, formatCurrency } from '../utils/config';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout: React.FC = () => {
  const { items, totalAmount, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState<{
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    phone?: string;
  }>({});
  
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!address.street.trim()) {
      newErrors.street = 'Street address is required';
    }
    
    if (!address.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!address.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!address.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5,6}$/.test(address.zipCode)) {
      newErrors.zipCode = 'Invalid ZIP code';
    }
    
    if (!address.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(address.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm() || !token) return;
    
    setIsProcessing(true);
    
    try {
      // Create Razorpay order
      const orderResponse = await createPaymentOrder(totalAmount, token);
      
      // Initialize Razorpay
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        name: 'PizzaCraft',
        description: 'Payment for your custom pizza order',
        order_id: orderResponse.id,
        handler: async function(response: any) {
          try {
            // Verify payment
            const paymentVerification = await verifyPayment({
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature
            }, token);
            
            // Create order in database
            const orderData = {
              items: items.map(item => ({
                base: {
                  id: item.base.id,
                  name: item.base.name,
                  price: item.base.price
                },
                sauce: {
                  id: item.sauce.id,
                  name: item.sauce.name,
                  price: item.sauce.price
                },
                cheese: {
                  id: item.cheese.id,
                  name: item.cheese.name,
                  price: item.cheese.price
                },
                veggies: item.veggies.map(veggie => ({
                  id: veggie.id,
                  name: veggie.name,
                  price: veggie.price
                }))
              })),
              totalAmount,
              paymentId: paymentVerification.payment_id,
              address: address
            };
            
            const newOrder = await createOrder(orderData, token);
            
            // Clear cart and navigate to success page
            clearCart();
            navigate(`/order-success/${newOrder._id}`);
          } catch (error) {
            if (error instanceof Error) {
              toast.error(error.message);
            } else {
              toast.error('An error occurred during payment processing');
            }
            setIsProcessing(false);
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: address.phone
        },
        theme: {
          color: '#D00000'
        }
      };
      
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An error occurred while creating payment order');
      }
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600">Complete your order with a few more steps</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Delivery Address */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Delivery Address</h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Street Address"
                  id="street"
                  placeholder="123 Main St"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  error={errors.street}
                  containerClassName="md:col-span-2"
                />
                
                <Input
                  label="City"
                  id="city"
                  placeholder="Cityville"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  error={errors.city}
                />
                
                <Input
                  label="State"
                  id="state"
                  placeholder="State"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  error={errors.state}
                />
                
                <Input
                  label="ZIP Code"
                  id="zipCode"
                  placeholder="12345"
                  value={address.zipCode}
                  onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                  error={errors.zipCode}
                />
                
                <Input
                  label="Phone Number"
                  id="phone"
                  placeholder="(555) 123-4567"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  error={errors.phone}
                  containerClassName="md:col-span-2"
                />
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-md mt-8 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Order Items</h2>
              <p className="text-gray-600 text-sm">{items.length} item(s)</p>
            </div>

            <ul className="divide-y divide-gray-200">
              {items.map((item, index) => (
                <li key={index} className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div>
                      <h3 className="font-semibold">Custom Pizza #{index + 1}</h3>
                      <p className="text-sm text-gray-600">
                        Base: {item.base.name}, Sauce: {item.sauce.name}, Cheese: {item.cheese.name}
                      </p>
                      {item.veggies.length > 0 && (
                        <p className="text-sm text-gray-600">
                          Veggies: {item.veggies.map(v => v.name).join(', ')}
                        </p>
                      )}
                    </div>
                    <p className="font-semibold mt-2 sm:mt-0">{formatCurrency(item.totalPrice)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span>Subtotal</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span>Delivery</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isProcessing}
                onClick={handlePlaceOrder}
              >
                Place Order & Pay
              </Button>
              
              <p className="text-center text-sm text-gray-500">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;