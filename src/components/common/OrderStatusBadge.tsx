import React from 'react';
import { Clock, Utensils, Truck, CheckCircle } from 'lucide-react';

interface OrderStatusBadgeProps {
  status: 'received' | 'in-kitchen' | 'out-for-delivery' | 'delivered';
  className?: string;
  showLabel?: boolean;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ 
  status, 
  className = '',
  showLabel = true
}) => {
  const statusConfig = {
    'received': {
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-800',
      icon: <Clock className="w-3.5 h-3.5" />
    },
    'in-kitchen': {
      color: 'amber',
      gradient: 'from-amber-400 to-amber-500',
      bgLight: 'bg-amber-50',
      textColor: 'text-amber-800',
      icon: <Utensils className="w-3.5 h-3.5" />
    },
    'out-for-delivery': {
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-800',
      icon: <Truck className="w-3.5 h-3.5" />
    },
    'delivered': {
      color: 'green',
      gradient: 'from-green-500 to-green-600',
      bgLight: 'bg-green-50',
      textColor: 'text-green-800',
      icon: <CheckCircle className="w-3.5 h-3.5" />
    }
  };

  const config = statusConfig[status];
  const formattedLabel = status.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return (
    <span 
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 
      ${config.bgLight} ${config.textColor} text-xs font-medium 
      ${showLabel ? 'pl-1.5 pr-2.5' : 'p-1.5'} 
      transition-all ${className}`}
    >
      <span className={`flex items-center justify-center p-0.5 rounded-full bg-gradient-to-br ${config.gradient} text-white`}>
        {config.icon}
      </span>
      {showLabel && formattedLabel}
    </span>
  );
};

export default OrderStatusBadge;