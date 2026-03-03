import { type ElementType, type Ref, forwardRef } from "react";

import { WuiColorAlias } from "../../enum/WuiColorAlias.enum";
import { clsx } from "../../utils/clsx";
import {
  WuiFontFamily,
  WuiTextAs,
  WuiTextSize,
  WuiTextWeight,
} from "./WuiText.props";
import type { WuiTextElement, WuiTextProps } from "./WuiText.props";

export const WuiText = forwardRef<WuiTextElement, WuiTextProps>(
  (
    {
      className = "",
      size = WuiTextSize.M,
      weight = WuiTextWeight.NORMAL,
      color = WuiColorAlias.NEUTRAL_900,
      fontFamily = WuiFontFamily.SERIF,
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
      `wui-text--${color}`,
      `wui-text--${fontFamily}`,
      className
    );

    return (
      <Tag ref={ref as Ref<HTMLElement>} className={classNames} {...props} />
    );
  }
);

WuiText.displayName = "WuiText";
