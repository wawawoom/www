import { forwardRef, useEffect, useRef, useState } from "react";

import { clsx } from "../../utils/clsx";
import type { WuiModalProps } from "./WuiModal.props";
import { WuiText, WuiTextAs, WuiTextSize } from "../WuiText";
import { WuiButton, WuiButtonColor, WuiButtonSize } from "../WuiButton";

export const WuiModal = forwardRef<HTMLDialogElement, WuiModalProps>(
  (
    {
      open,
      onClose,
      title,
      children,
      footer,
      className = "",
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<HTMLDialogElement>(null);
    const [isAnimatedOpen, setIsAnimatedOpen] = useState(false);
    const isClosingRef = useRef(false);

    const classNames = clsx("wui-modal", isAnimatedOpen && "wui-modal--open", className);

    useEffect(() => {
      const dialog = innerRef.current;
      /* istanbul ignore next -- React sets refs before running effects */
      if (!dialog) return;

      if (open) {
        isClosingRef.current = false;
        if (typeof dialog.showModal === "function") {
          dialog.showModal();
        } else {
          (dialog as HTMLDialogElement & { open: boolean }).open = true;
        }
        const raf = requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsAnimatedOpen(true));
        });
        return () => cancelAnimationFrame(raf);
      } else {
        setIsAnimatedOpen(false);
        isClosingRef.current = true;
      }
    }, [open]);

    /* On transition end when closing: actually close the dialog and notify parent */
    useEffect(() => {
      const dialog = innerRef.current;

      /* istanbul ignore next -- React sets refs before running effects */
      if (!dialog) {
        return;
      }

      const finishClose = () => {
        /* istanbul ignore next -- already guarded by handleTransitionEnd */
        if (!isClosingRef.current) {
          return;
        }

        isClosingRef.current = false;
        if (typeof dialog.close === "function") {
          dialog.close();
        } else {
          (dialog as HTMLDialogElement & { open: boolean }).open = false;
        }
        onClose();
      };

      const handleTransitionEnd = (e: TransitionEvent) => {
        if (e.target !== dialog || !isClosingRef.current) return;
        if (e.propertyName !== "transform" && e.propertyName !== "opacity") return;
        finishClose();
      };

      dialog.addEventListener("transitionend", handleTransitionEnd);

      return () => {
        return dialog.removeEventListener("transitionend", handleTransitionEnd);
      }
    }, [onClose]);

    /* Cancel (Escape / backdrop): prevent close, run closing animation then close */
    useEffect(() => {
      const dialog = innerRef.current;
      /* istanbul ignore next -- React sets refs before running effects */
      if (!dialog) return;

      const handleCancel = (e: Event) => {
        e.preventDefault();
        if (!isClosingRef.current) {
          isClosingRef.current = true;
          setIsAnimatedOpen(false);
        }
      };

      dialog.addEventListener("cancel", handleCancel);
      return () => dialog.removeEventListener("cancel", handleCancel);
    }, []);

    /* Fallback: if dialog is closed by browser without animation (e.g. no transition run) */
    useEffect(() => {
      const dialog = innerRef.current;
      /* istanbul ignore next -- React sets refs before running effects */
      if (!dialog) return;

      const handleClose = () => {
        if (isClosingRef.current) return;
        onClose();
      };

      dialog.addEventListener("close", handleClose);
      return () => dialog.removeEventListener("close", handleClose);
    }, [onClose]);

    const setRef = (node: HTMLDialogElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      }
      else if (ref != null) {
        (ref as React.MutableRefObject<HTMLDialogElement | null>).current = node;
      }

    };

    const handleCloseClick = () => {
      if (!isClosingRef.current) {
        isClosingRef.current = true;
        setIsAnimatedOpen(false);
      }
    };

    const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
      e.stopPropagation();
    };

    return (
      <dialog
        ref={setRef}
        className={classNames}
        onClick={handleDialogClick}
        {...props}
      >
        <div className="wui-modal__container">
          <header className="wui-modal__header">
            {title != null && (
              <WuiText as={WuiTextAs.DIV} size={WuiTextSize.XL} className="wui-modal__title">{title}</WuiText>
            )}

            <WuiButton color={WuiButtonColor.GHOST} size={WuiButtonSize.L} onClick={handleCloseClick} aria-label="Close" leftIcon="fa-solid fa-xmark" />
          </header>

          <div className="wui-modal__body">{children}</div>

          {footer != null && (
            <footer className="wui-modal__footer">{footer}</footer>
          )}
        </div>
      </dialog>
    );
  }
);

WuiModal.displayName = "WuiModal";
