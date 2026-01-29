import { forwardRef } from "react";

import { clsx } from "../../utils/clsx";
import { WuiLinkColor, WuiLinkProps, WuiLinkSize } from "./WuiLink.props";

export const WuiLink = forwardRef<HTMLAnchorElement, WuiLinkProps>(
  ({ color = WuiLinkColor.NONE, size, className = "", ...props }, ref) => {
    const classNames = clsx(
      "wui-link",
      `wui-link--${color}`,
      Boolean(size)
        ? `wui-link--${size}`
        : color !== WuiLinkColor.NONE && !Boolean(size)
          ? `wui-link--${WuiLinkSize.M}`
          : "",
      className
    );

    return <a ref={ref} className={classNames} {...props} />;
  }
);

WuiLink.displayName = "WuiLink";
