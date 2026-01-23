import { type HTMLAttributes, forwardRef } from 'react';

export interface WuiTitleProps extends Omit<HTMLAttributes<HTMLHeadingElement>, 'as'> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const WuiTitle = forwardRef<HTMLHeadingElement, WuiTitleProps>(
  ({ className = '', as: Tag = 'h1', ...props }, ref) => {
    const classNames = [
      'wui-title',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Tag ref={ref} className={classNames} {...props} />
    );
  }
);


WuiTitle.displayName = 'WuiTitle';
