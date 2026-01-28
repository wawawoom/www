import { forwardRef } from "react";

import { clsx } from "../../utils/clsx";
import {
  WuiButtonColor,
  WuiButtonProps,
  WuiButtonSize,
} from "./WuiButton.props";

export const WuiButton = forwardRef<HTMLButtonElement, WuiButtonProps>(
  (
    {
      color = WuiButtonColor.LIGHT,
      size = WuiButtonSize.M,
      block = false,
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

    return <button ref={ref} className={classNames} {...props} />;
  }
);

WuiButton.displayName = "WuiButton";
