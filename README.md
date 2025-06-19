# 🍕 PizzaCraft - Custom Pizza Delivery App

A modern, feature-rich pizza delivery application built with React, TypeScript, and Vite. PizzaCraft allows users to create custom pizzas with a variety of options, manage their orders, and track deliveries in real-time.

## ✨ Features

### 🛠️ Pizza Customization
- Choose from multiple pizza sizes (10" to 16")
- Select crust types (Thin, Regular, Thick, Stuffed)
- Pick your favorite base
- Customize sauce amount (Light, Regular, Extra)
- Adjust cheese quantity (Light, Regular, Extra)
- Add various vegetable toppings
- Set cooking preferences (Normal, Well Done, Light Bake)
- Add special instructions

### 👤 User Management
- User registration and login
- Email verification
- Password reset functionality
- Protected routes for authenticated users

### 🛒 Order Management
- Shopping cart functionality
- Secure checkout process
- Integration with Razorpay payment gateway
- Order history
- Real-time order tracking

### 💅 UI/UX Features
- Modern, responsive design
- Dark theme
- Smooth animations
- Interactive pizza builder
- Real-time price updates
- Toast notifications

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <https://github.com/Uchiha-byte/PizzaCraft.git>
cd pizza-delivery-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🛠️ Built With

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Data Fetching**: TanStack Query (React Query) 
- **Routing**: React Router
- **Payment Integration**: Razorpay
- **UI Components**: Custom components with Lucide icons
- **Form Handling**: React Hook Form
- **Notifications**: Sonner


## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
├── contexts/        # React Context providers
├── pages/          # Application pages/routes
├── utils/          # Utility functions and configs
├── App.tsx         # Main application component
└── main.tsx        # Application entry point
```

## 🔧 Configuration

The application uses various configuration files:
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - ESLint configuration

## 🚀 Deployment

1. Build the application:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vite team for the blazing fast build tool
- All contributors who have helped shape this project 
