import { forwardRef } from "react";

import { WuiColorAlias } from "../../enum";
import { clsx } from "../../utils/clsx";
import { WuiTitleAs, WuiTitleProps } from "./WuiTitle.props";

export const WuiTitle = forwardRef<HTMLHeadingElement, WuiTitleProps>(
  (
    {
      className = "",
      as: Tag = WuiTitleAs.H1,
      look,
      color = WuiColorAlias.NEUTRAL_900,
      ...props
    },
    ref
  ) => {
    const classNames = clsx(
      "wui-title",
      look ? `wui-title--${look}` : "",
      color ? `wui-title--${color}` : "",
      className
    );

    return <Tag ref={ref} className={classNames} {...props} />;
  }
);

WuiTitle.displayName = "WuiTitle";
