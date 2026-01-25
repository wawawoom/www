import { forwardRef } from "react";

import { clsx } from "../../utils/clsx";
import { WuiTitleAs, WuiTitleProps } from "./WuiTitle.props";

export const WuiTitle = forwardRef<HTMLHeadingElement, WuiTitleProps>(
  ({ className = "", as: Tag = WuiTitleAs.H1, ...props }, ref) => {
    const classNames = clsx("wui-title", className);

    return <Tag ref={ref} className={classNames} {...props} />;
  }
);

WuiTitle.displayName = "WuiTitle";
