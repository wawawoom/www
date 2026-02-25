import { forwardRef } from "react";

import { clsx } from "../../utils/clsx";
import { WuiInputHelperStatus } from "./WuiInputHelper.props";
import type { WuiInputHelperProps } from "./WuiInputHelper.props";

const STATUS_ICONS: Record<WuiInputHelperStatus, string> = {
  [WuiInputHelperStatus.DEFAULT]: "fa-solid fa-circle-info",
  [WuiInputHelperStatus.ERROR]: "fa-solid fa-circle-xmark",
  [WuiInputHelperStatus.VALID]: "fa-solid fa-circle-check",
};

export const WuiInputHelper = forwardRef<HTMLDivElement, WuiInputHelperProps>(
  (
    {
      status = WuiInputHelperStatus.DEFAULT,
      message,
      className = "",
      ...props
    },
    ref
  ) => {
    const componentName = "wui-input-helper";
    const iconClass = STATUS_ICONS[status];

    const classNames = clsx(
      componentName,
      `${componentName}--${status}`,
      className
    );

    return (
      <div ref={ref} className={classNames} {...props}>
        <span className={`${componentName}__icon`} aria-hidden>
          <i className={iconClass} />
        </span>

        <span className={`${componentName}__text`}>{message}</span>
      </div>
    );
  }
);

WuiInputHelper.displayName = "WuiInputHelper";
