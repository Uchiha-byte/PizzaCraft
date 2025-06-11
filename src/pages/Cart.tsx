import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency } from '../utils/config';

const Cart: React.FC = () => {
  const { items, removeFromCart, totalAmount, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any pizzas to your cart yet.</p>
          <Link to="/build">
            <Button variant="primary" size="lg">
              Start Building Your Pizza
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart</h1>
        <p className="text-gray-600">Review your order before checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <p className="text-gray-600 text-sm">{items.length} item(s) in cart</p>
            </div>

            <ul className="divide-y divide-gray-200">
              {items.map((item, index) => (
                <li key={index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="font-semibold text-lg mb-2">Custom Pizza #{index + 1}</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li><span className="font-medium">Base:</span> {item.base.name}</li>
                        <li><span className="font-medium">Sauce:</span> {item.sauce.name}</li>
                        <li><span className="font-medium">Cheese:</span> {item.cheese.name}</li>
                        <li>
                          <span className="font-medium">Veggies:</span>{' '}
                          {item.veggies.length > 0 
                            ? item.veggies.map(v => v.name).join(', ') 
                            : 'None'}
                        </li>
                      </ul>
                    </div>
                    <div className="flex flex-row sm:flex-col justify-between items-end">
                      <p className="font-semibold text-lg">{formatCurrency(item.totalPrice)}</p>
                      <button 
                        onClick={() => removeFromCart(index)}
                        className="text-red-600 hover:text-red-800 transition-colors flex items-center text-sm mt-2"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between">
            <Link to="/build" className="flex items-center text-red-600 hover:text-red-800">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Continue Building
            </Link>
            
            <button
              onClick={() => clearCart()}
              className="mt-4 sm:mt-0 text-gray-600 hover:text-gray-800"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Total</h2>
            
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
            
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
            
            <p className="text-center text-sm text-gray-500 mt-4">
              Taxes included. Delivery calculated at checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;