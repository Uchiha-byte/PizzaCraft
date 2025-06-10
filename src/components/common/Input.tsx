import React, { InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
  icon?: React.ReactNode;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPasswordField = props.type === 'password';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const modifiedProps = {
    ...props,
  };

  if (isPasswordField) {
    modifiedProps.type = showPassword ? 'text' : 'password';
  }

  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        <input
          className={`w-full px-3 py-2.5 ${icon ? 'pl-10' : 'pl-4'} border rounded-lg bg-gray-700 
            border-gray-600 text-white placeholder-gray-400 focus:outline-none 
            focus:ring-2 focus:ring-primary-500 focus:border-transparent
            ${error ? 'border-red-500 ring-1 ring-red-500' : ''}
            ${className}`}
          {...modifiedProps}
        />
        {isPasswordField && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;