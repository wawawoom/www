import { type ButtonHTMLAttributes, forwardRef } from 'react';

export interface WuiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export const WuiButton = forwardRef<HTMLButtonElement, WuiButtonProps>(
  ({ variant = 'primary', size = 'medium', className = '', ...props }, ref) => {
    const classNames = [
      'wui-button',
      `wui-button--${variant}`,
      `wui-button--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        {...props}
      />
    );
  }
);

WuiButton.displayName = 'WuiButton';
