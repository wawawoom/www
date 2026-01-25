import { type ElementType, forwardRef } from "react";

import { clsx } from "../../utils/clsx";
import {
  WuiTextAs,
  WuiTextElement,
  WuiTextProps,
  WuiTextSize,
  WuiTextWeight,
} from "./WuiText.props";

export const WuiText = forwardRef<WuiTextElement, WuiTextProps>(
  (
    {
      className = "",
      size = WuiTextSize.M,
      weight = WuiTextWeight.NORMAL,
      as,
      ...props
    },
    ref
  ) => {
    const Tag = (as ?? WuiTextAs.DIV) as ElementType;
    const classNames = clsx(
      "wui-text",
      `wui-text--${size}`,
      `wui-text--${weight}`,
      className
    );

    return <Tag ref={ref as any} className={classNames} {...props} />;
  }
);

WuiText.displayName = "WuiText";
