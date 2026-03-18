import { forwardRef, useId } from "react";

import { clsx } from "../../utils/clsx";
import { WuiInputHelper } from "../WuiInputHelper/WuiInputHelper";
import { WuiTextareaHeight, WuiTextareaStatus } from "./WuiTextarea.props";
import type { WuiTextareaProps } from "./WuiTextarea.props";

export const WuiTextarea = forwardRef<HTMLTextAreaElement, WuiTextareaProps>(
  (
    {
      height = WuiTextareaHeight.M,
      status = WuiTextareaStatus.DEFAULT,
      label,
      className = "",
      id: idProp,
      helpers = [],
      ...props
    },
    ref
  ) => {
    const componentName = "wui-textarea";
    const generatedId = useId();
    const textareaId = idProp ?? (label ? generatedId : undefined);

    const classNames = clsx(
      componentName,
      `${componentName}--${height}`,
      `${componentName}--${status}`,
      className
    );

    return (
      <div className="wui-textarea-group">
        {label && (
          <label htmlFor={textareaId} className="wui-textarea__label">
            {label}
          </label>
        )}

        <div className="wui-textarea-wrapper">
          <textarea
            ref={ref}
            id={textareaId}
            className={classNames}
            aria-invalid={status === WuiTextareaStatus.ERROR ? true : undefined}
            {...props}
          />
        </div>

        {helpers.length > 0 && (
          <div className="wui-textarea__helpers">
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

WuiTextarea.displayName = "WuiTextarea";
