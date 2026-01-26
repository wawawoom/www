import { forwardRef } from "react";

import { clsx } from "../../utils/clsx";
import { WuiTitleAs, WuiTitleLook, WuiTitleProps } from "./WuiTitle.props";

export const WuiTitle = forwardRef<HTMLHeadingElement, WuiTitleProps>(
  ({ className = "", as: Tag = WuiTitleAs.H1, look, ...props }, ref) => {
    const classNames = clsx(
      "wui-title",
      look ? `wui-title--${look}` : "",
      className
    );

    return <Tag ref={ref} className={classNames} {...props} />;
  }
);

WuiTitle.displayName = "WuiTitle";
