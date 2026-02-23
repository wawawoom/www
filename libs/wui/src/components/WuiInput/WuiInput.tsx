import { forwardRef, useId } from "react";

import { clsx } from "../../utils/clsx";
import { WuiInputHeight, WuiInputStatus } from "./WuiInput.props";
import type { WuiInputProps } from "./WuiInput.props";

export const WuiInput = forwardRef<HTMLInputElement, WuiInputProps>(
  (
    {
      height = WuiInputHeight.M,
      status = WuiInputStatus.DEFAULT,
      block = false,
      label,
      className = "",
      id: idProp,
      ...props
    },
    ref
  ) => {
    const componentName = "wui-input";
    const generatedId = useId();
    const inputId = idProp ?? (label ? generatedId : undefined);

    const classNames = clsx(
      componentName,
      `${componentName}--${height}`,
      `${componentName}--${status}`,
      block ? `${componentName}--block` : "",
      className
    );

    return (
      <div className="wui-input-group">
        {label && (
          <label htmlFor={inputId} className="wui-input__label">
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          className={classNames}
          aria-invalid={status === WuiInputStatus.ERROR ? true : undefined}
          {...props}
        />
      </div>
    );
  }
);

WuiInput.displayName = "WuiInput";
