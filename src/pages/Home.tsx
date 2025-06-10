import React from 'react';
import { Link } from 'react-router-dom';
import { Pizza, ThumbsUp, Clock, CreditCard, Star, ChevronRight, Utensils, Shield, BadgeCheck } from 'lucide-react';
import Button from '../components/common/Button';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-900 pt-20 pb-28">
        {/* Animated background patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-10 top-10 w-40 h-40 rounded-full border-8 border-dashed border-primary-500/20 opacity-20 pizza-rotate"></div>
          <div className="absolute -left-20 bottom-20 w-60 h-60 rounded-full border-8 border-dashed border-primary-500/20 opacity-20 pizza-rotate" style={{ animationDirection: 'reverse', animationDuration: '40s' }}></div>
          <div className="bg-gradient-to-br from-primary-500/10 to-primary-800/30 absolute inset-0"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Craft Your
                <span className="relative mx-2">
                  <span className="bg-gradient-to-r from-primary-500 to-primary-400 text-transparent bg-clip-text">Perfect</span>
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary-500 rounded-full opacity-70"></span>
                </span>
                Pizza
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                Build your dream pizza with fresh, premium ingredients. 
                From classic to creative, the perfect pizza is just a few clicks away.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link to="/build">
                  <Button 
                    variant="primary" 
                    size="lg"
                    className="shadow-xl shadow-primary-600/20"
                    icon={<Pizza className="h-5 w-5" />}
                  >
                    Build Your Pizza
                  </Button>
                </Link>
                <Link to="/login" className="text-white hover:text-primary-300 transition-colors flex items-center">
                  <span>Already have an account?</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              {/* Testimonial */}
              <div className="mt-10 bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 hidden md:block">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                      alt="Customer" 
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-200 text-sm italic">"The best custom pizza I've ever had! The ingredients were incredibly fresh and the delivery was faster than expected."</p>
                    <p className="text-primary-300 text-xs mt-1">- Rahul M.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 relative mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full opacity-20 animate-pulse-slow"></div>
                <img 
                  src="https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Pizza" 
                  className="absolute inset-0 w-full h-full object-cover rounded-full shadow-2xl"
                />
                <div className="absolute -right-4 -bottom-2 bg-gray-800 rounded-full p-3 shadow-lg">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-full p-2 text-white">
                    <Utensils className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Curved bottom shape */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="fill-gray-800 w-full h-auto">
            <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose <span className="text-primary-500">PizzaCraft</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We're committed to delivering the best pizza experience with premium ingredients, quick delivery, and complete customization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="pizza-card p-6 hover:border-l-4 hover:border-l-primary-500 transition-all bg-gray-700">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-5 shadow-lg">
                <BadgeCheck className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Premium Quality</h3>
              <p className="text-gray-300">
                We use only the freshest, highest-quality ingredients to ensure every pizza is perfect.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="pizza-card p-6 hover:border-l-4 hover:border-l-primary-500 transition-all bg-gray-700">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center mb-5 shadow-lg">
                <Pizza className="h-6 w-6 text-primary-900" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Complete Customization</h3>
              <p className="text-gray-300">
                Build your pizza exactly how you like it with our extensive selection of bases, sauces, and toppings.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="pizza-card p-6 hover:border-l-4 hover:border-l-primary-500 transition-all bg-gray-700">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-5 shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Fast Delivery</h3>
              <p className="text-gray-300">
                Your custom pizza will be at your doorstep in no time, hot and fresh from our ovens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary-500 bg-gray-700 px-3 py-1 rounded-full">SIMPLE PROCESS</span>
            <h2 className="text-3xl font-bold text-white mt-4 mb-4">
              How It Works
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Creating your perfect pizza is easy with our simple 3-step process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 transform translate-y-2 z-0"></div>
            
            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-6 shadow-xl">
                <Pizza className="w-8 h-8 text-white" />
                <span className="absolute top-0 right-0 bg-gray-700 text-primary-500 w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold shadow-md">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Build Your Pizza</h3>
              <p className="text-gray-300">
                Choose your favorite base, sauce, cheese, and toppings to create your perfect pizza.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center md:mt-12">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center mb-6 shadow-xl">
                <CreditCard className="w-8 h-8 text-primary-900" />
                <span className="absolute top-0 right-0 bg-gray-700 text-primary-500 w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold shadow-md">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Order & Pay</h3>
              <p className="text-gray-300">
                Review your order, add to cart, and complete your purchase securely with our payment system.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-6 shadow-xl">
                <Clock className="w-8 h-8 text-white" />
                <span className="absolute top-0 right-0 bg-gray-700 text-primary-500 w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold shadow-md">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Track & Enjoy</h3>
              <p className="text-gray-300">
                Track your order status in real-time and get ready to enjoy your custom pizza creation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Showcase */}
      <section className="py-20 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary-500 bg-gray-700 px-3 py-1 rounded-full">QUALITY INGREDIENTS</span>
            <h2 className="text-3xl font-bold text-white mt-4 mb-4">
              Premium Ingredients
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We use only the freshest, highest-quality ingredients to ensure every pizza is perfect.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Hand-Tossed Dough",
                image: "https://images.pexels.com/photos/9510/food-pizza-kitchen-recipe.jpg",
                description: "Made fresh daily"
              },
              {
                name: "Artisan Cheeses",
                image: "https://images.pexels.com/photos/4109900/pexels-photo-4109900.jpeg",
                description: "Premium mozzarella & more"
              },
              {
                name: "Gourmet Sauces",
                image: "https://images.pexels.com/photos/1435851/pexels-photo-1435851.jpeg",
                description: "From classic marinara to pesto"
              },
              {
                name: "Fresh Veggies",
                image: "https://images.pexels.com/photos/5945561/pexels-photo-5945561.jpeg",
                description: "Farm-to-table freshness"
              }
            ].map((ingredient, index) => (
              <div key={index} className="pizza-card overflow-hidden group bg-gray-700">
                <div className="h-56 overflow-hidden">
                  <img 
                    src={ingredient.image} 
                    alt={ingredient.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5 border-t border-gray-600">
                  <h3 className="text-xl font-semibold text-white mb-1">{ingredient.name}</h3>
                  <p className="text-gray-300 text-sm">{ingredient.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-600 to-primary-700 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-gray-800 opacity-5 rounded-full transform -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-gray-800 opacity-5 rounded-full transform translate-y-1/2 -translate-x-1/3"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Craft Your Masterpiece?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Your perfect pizza is just a few clicks away. Create something delicious today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/build">
              <Button 
                variant="secondary" 
                size="lg"
                icon={<Pizza className="h-5 w-5" />}
                className="shadow-xl"
              >
                Start Creating
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-transparent border-white/30 text-white hover:bg-white/10"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;