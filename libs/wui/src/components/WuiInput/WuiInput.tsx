import { forwardRef, useId, useState } from "react";

import { clsx } from "../../utils/clsx";
import { WuiInputHelper } from "../WuiInputHelper/WuiInputHelper";
import { WuiInputHeight, WuiInputStatus } from "./WuiInput.props";
import type { WuiInputProps } from "./WuiInput.props";

export const WuiInput = forwardRef<HTMLInputElement, WuiInputProps>(
  (
    {
      height = WuiInputHeight.M,
      status = WuiInputStatus.DEFAULT,
      label,
      type = "text",
      className = "",
      id: idProp,
      helpers = [],
      ...props
    },
    ref
  ) => {
    const componentName = "wui-input";
    const generatedId = useId();
    const inputId = idProp ?? (label ? generatedId : undefined);

    const isPassword = type === "password";
    const isCheckbox = type === "checkbox";
    const isRadio = type === "radio";
    const isChoice = isCheckbox || isRadio;
    const [showPassword, setShowPassword] = useState(false);
    const inputType = isPassword && showPassword ? "text" : type;

    const classNames = clsx(
      componentName,
      `${componentName}--${height}`,
      `${componentName}--${status}`,
      isPassword ? `${componentName}--with-toggle` : "",
      isCheckbox ? `${componentName}--checkbox` : "",
      isRadio ? `${componentName}--radio` : "",
      className
    );

    const groupClassNames = clsx(
      "wui-input-group",
      isChoice ? "wui-input-group--choice" : ""
    );

    return (
      <div className={groupClassNames}>
        {isChoice && (
          <div className="wui-input-wrapper">
            <input
              ref={ref}
              type={inputType}
              id={inputId}
              className={classNames}
              aria-invalid={status === WuiInputStatus.ERROR ? true : undefined}
              {...props}
            />
          </div>
        )}

        {label && (
          <label htmlFor={inputId} className="wui-input__label">
            {label}
          </label>
        )}

        {!isChoice && (
          <div className="wui-input-wrapper">
            <input
              ref={ref}
              type={inputType}
              id={inputId}
              className={classNames}
              aria-invalid={status === WuiInputStatus.ERROR ? true : undefined}
              {...props}
            />

            {isPassword && (
              <button
                type="button"
                className="wui-input__toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
                title={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
              >
                <i
                  className={
                    showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
                  }
                  aria-hidden
                />
              </button>
            )}
          </div>
        )}

        {helpers.length > 0 && (
          <div className="wui-input__helpers">
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

WuiInput.displayName = "WuiInput";
