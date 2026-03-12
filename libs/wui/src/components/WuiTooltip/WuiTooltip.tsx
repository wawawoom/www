import { forwardRef, useId } from "react";

import { clsx } from "../../utils/clsx";
import { WuiTooltipPlacement } from "./WuiTooltip.props";
import type { WuiTooltipProps } from "./WuiTooltip.props";

export const WuiTooltip = forwardRef<HTMLSpanElement, WuiTooltipProps>(
  (
    {
      content,
      placement = WuiTooltipPlacement.TOP,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const contentId = useId();

    const rootClassNames = clsx(
      "wui-tooltip",
      `wui-tooltip--${placement}`,
      className
    );

    return (
      <span
        ref={ref}
        className={rootClassNames}
        data-placement={placement}
        {...props}
      >
        <span
          className="wui-tooltip__anchor"
          aria-describedby={contentId}
        >
          {children}
        </span>
        <span
          id={contentId}
          className="wui-tooltip__content"
          role="tooltip"
        >
          {content}
        </span>
      </span>
    );
  }
);

WuiTooltip.displayName = "WuiTooltip";
