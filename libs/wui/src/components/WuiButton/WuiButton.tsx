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
      className = "",
      ...props
    },
    ref
  ) => {
    const classNames = clsx(
      "wui-button",
      `wui-button--${color}`,
      `wui-button--${size}`,
      className
    );

    return <button ref={ref} className={classNames} {...props} />;
  }
);

WuiButton.displayName = "WuiButton";
