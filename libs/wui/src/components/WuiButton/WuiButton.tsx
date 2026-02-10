import { forwardRef } from "react";

import { clsx } from "../../utils/clsx";
import {
  WuiButtonColor,
  WuiButtonSize,
} from "./WuiButton.props";
import type { WuiButtonProps } from "./WuiButton.props";

export const WuiButton = forwardRef<HTMLButtonElement, WuiButtonProps>(
  (
    {
      color = WuiButtonColor.LIGHT,
      size = WuiButtonSize.M,
      block = false,
      leftIcon,
      rightIcon,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const classNames = clsx(
      "wui-button",
      `wui-button--${color}`,
      `wui-button--${size}`,
      block ? "wui-button--block" : "",
      className
    );

    return (
      <button ref={ref} className={classNames} {...props}>
        {leftIcon && <i className={leftIcon}></i>}

        {children}

        {rightIcon && <i className={rightIcon}></i>}
      </button>
    );
  }
);

WuiButton.displayName = "WuiButton";
