import { type ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "../../utils/clsx";

export interface WuiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
}

export const WuiButton = forwardRef<HTMLButtonElement, WuiButtonProps>(
  ({ variant = "primary", size = "medium", className = "", ...props }, ref) => {
    const classNames = clsx(
      "wui-button",
      `wui-button--${variant}`,
      `wui-button--${size}`,
      className,
    );

    return <button ref={ref} className={classNames} {...props} />;
  },
);

WuiButton.displayName = "WuiButton";
