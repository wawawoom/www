import { forwardRef } from "react";

import { clsx } from "../../utils/clsx";
import {
  WuiAlertColor,
} from "./WuiAlert.props";
import type { WuiAlertProps } from "./WuiAlert.props";

const DEFAULT_ICONS: Record<WuiAlertColor, string> = {
  [WuiAlertColor.SUCCESS]: "fa-solid fa-check",
  [WuiAlertColor.ERROR]: "fa-solid fa-exclamation",
  [WuiAlertColor.WARNING]: "fa-solid fa-triangle-exclamation",
  [WuiAlertColor.INFO]: "fa-solid fa-info",
  [WuiAlertColor.LIGHT]: "fa-solid fa-info",
  [WuiAlertColor.DARK]: "fa-solid fa-info",
};

export const WuiAlert = forwardRef<HTMLDivElement, WuiAlertProps>(
  (
    {
      color = WuiAlertColor.INFO,
      icon,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const componentName = "wui-alert";
    const iconClass = icon ?? DEFAULT_ICONS[color];

    const classNames = clsx(
      componentName,
      `${componentName}--${color}`,
      className
    );

    return (
      <div ref={ref} className={classNames} role="alert" {...props}>
        <span className={`${componentName}__icon`} aria-hidden>
          <i className={iconClass} />
        </span>

        {typeof children === "string" ? <span className={`${componentName}__message`}>{children}</span> : <div className={`${componentName}__message`}>{children}</div>}
      </div>
    );
  }
);

WuiAlert.displayName = "WuiAlert";
