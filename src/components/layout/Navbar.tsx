import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { ShoppingCart, Menu, X, User, LogOut, Pizza, Clock } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900 shadow-lg py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center group"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className={`relative h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 shadow-md group-hover:shadow-lg transition-all duration-300 ${scrolled ? 'rotate-0' : 'rotate-12'}`}>
                <Pizza className="h-6 w-6 text-white transform group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div className="ml-2 text-xl font-extrabold tracking-tight">
                <span className={`transition-colors duration-300 ${scrolled ? 'text-primary-500' : 'text-primary-500'}`}>Pizza</span>
                <span className={`transition-colors duration-300 ${scrolled ? 'text-gray-200' : 'text-white'}`}>Craft</span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/build" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive('/build') 
                  ? 'bg-primary-500 text-white shadow-md' 
                  : scrolled 
                    ? 'text-gray-300 hover:bg-gray-800 hover:text-primary-500' 
                    : 'text-white hover:bg-gray-800/40'
              }`}
            >
              Build Your Pizza
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/orders" 
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
                    isActive('/orders') 
                      ? 'bg-primary-500 text-white shadow-md' 
                      : scrolled 
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-primary-500' 
                        : 'text-white hover:bg-gray-800/40'
                  }`}
                >
                  <Clock className="h-4 w-4 mr-1" />
                  My Orders
                </Link>
                
                <div className="relative group">
                  <button 
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      scrolled 
                        ? 'text-gray-300 hover:bg-gray-800' 
                        : 'text-white hover:bg-gray-800/40'
                    }`}
                  >
                    <User className="h-4 w-4 mr-1" />
                    <span className="max-w-[100px] truncate">{user?.name}</span>
                  </button>
                  
                  <div className="absolute right-0 w-48 mt-1 py-2 bg-gray-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50 border border-gray-700">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-primary-500"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:from-primary-600 hover:to-primary-700"
              >
                Sign In
              </Link>
            )}
            
            <Link 
              to="/cart" 
              className={`p-2.5 rounded-full transition-all duration-300 relative ${
                isActive('/cart') 
                  ? 'bg-primary-500 text-white shadow-md' 
                  : scrolled 
                    ? 'text-gray-300 hover:bg-gray-800 hover:text-primary-500' 
                    : 'text-white hover:bg-gray-800/40'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-primary-800 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Link 
              to="/cart" 
              className={`p-2 rounded-full relative ${
                scrolled ? 'text-gray-300' : 'text-white'
              }`}
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-primary-800 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                  {itemCount}
                </span>
              )}
            </Link>
            
            <button 
              onClick={toggleMenu} 
              className={`p-2 ml-2 rounded-lg ${
                scrolled ? 'text-gray-300 hover:bg-gray-800' : 'text-white hover:bg-gray-800/40'
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`fixed inset-0 bg-gray-900 bg-opacity-80 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      >
        <div 
          className={`fixed top-0 right-0 h-full w-64 bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-5">
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600">
                  <Pizza className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 font-bold text-primary-500">PizzaCraft</span>
              </Link>
              <button onClick={toggleMenu} className="text-gray-300 hover:text-gray-100">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-2">
              <Link 
                to="/build" 
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/build') ? 'bg-primary-500 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Build Your Pizza
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/orders" 
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/orders') ? 'bg-primary-500 text-white' : 'text-gray-300 hover:bg-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      My Orders
                    </div>
                  </Link>
                  
                  <div className="border-t border-gray-700 my-4"></div>
                  
                  <div className="px-4 py-3 text-sm text-gray-400">
                    Signed in as <span className="font-medium text-gray-200">{user?.name}</span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-gray-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="block px-4 py-3 rounded-lg text-center text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 shadow-md hover:shadow-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;