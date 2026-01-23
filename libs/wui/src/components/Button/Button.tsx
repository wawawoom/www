import { ButtonHTMLAttributes, forwardRef } from 'react';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'medium', className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`wui-button wui-button--${variant} wui-button--${size} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
