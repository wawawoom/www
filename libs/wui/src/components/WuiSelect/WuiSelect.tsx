import { forwardRef, useId } from "react";

import { clsx } from "../../utils/clsx";
import { WuiInputHelper } from "../WuiInputHelper/WuiInputHelper";
import { WuiSelectHeight, WuiSelectStatus } from "./WuiSelect.props";
import type { WuiSelectProps } from "./WuiSelect.props";

export const WuiSelect = forwardRef<HTMLSelectElement, WuiSelectProps>(
  (
    {
      height = WuiSelectHeight.M,
      status = WuiSelectStatus.DEFAULT,
      label,
      className = "",
      id: idProp,
      helpers = [],
      children,
      ...props
    },
    ref
  ) => {
    const componentName = "wui-select";
    const generatedId = useId();
    const selectId = idProp ?? (label ? generatedId : undefined);

    const classNames = clsx(
      componentName,
      `${componentName}--${height}`,
      `${componentName}--${status}`,
      className
    );

    return (
      <div className="wui-select-group">
        {label && (
          <label htmlFor={selectId} className="wui-select__label">
            {label}
          </label>
        )}

        <div className="wui-select-wrapper">
          <select
            ref={ref}
            id={selectId}
            className={classNames}
            aria-invalid={status === WuiSelectStatus.ERROR ? true : undefined}
            {...props}
          >
            {children}
          </select>
        </div>

        {helpers.length > 0 && (
          <div className="wui-select__helpers">
            {helpers.map((helper, index) => (
              <WuiInputHelper
                key={`${index}-${helper.message}`}
                status={helper.status}
                message={helper.message}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

WuiSelect.displayName = "WuiSelect";
