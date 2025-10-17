import React from 'react';
import clsx from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-colors duration-200 inline-flex items-center justify-center';

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-blue-600 active:bg-blue-700 disabled:bg-disabled disabled:cursor-not-allowed',
    secondary: 'bg-surface text-text-primary border border-border hover:bg-gray-50 active:bg-gray-100 disabled:bg-disabled disabled:cursor-not-allowed',
    outline: 'bg-transparent text-primary border border-primary hover:bg-blue-50 active:bg-blue-100 disabled:border-disabled disabled:text-disabled disabled:cursor-not-allowed',
    ghost: 'bg-transparent text-primary hover:bg-blue-50 active:bg-blue-100 disabled:text-disabled disabled:cursor-not-allowed',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-button',
    lg: 'px-6 py-3 text-button',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        widthStyles,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
