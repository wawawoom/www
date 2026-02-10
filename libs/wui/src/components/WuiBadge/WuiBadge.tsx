import { forwardRef } from "react";

import { clsx } from "../../utils/clsx";
import {
  WuiBadgeColor,
  WuiBadgeSize,
} from "./WuiBadge.props";
import type { WuiBadgeProps } from "./WuiBadge.props";

export const WuiBadge = forwardRef<HTMLSpanElement, WuiBadgeProps>(
  (
    {
      color = WuiBadgeColor.DARK,
      size = WuiBadgeSize.M,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const classNames = clsx(
      "wui-badge",
      `wui-badge--${color}`,
      `wui-badge--${size}`,
      className
    );

    return (
      <span ref={ref} className={classNames} {...props}>{children}</span>
    );
  }
);

WuiBadge.displayName = "WuiBadge";
