import { useEffect } from "react";

import {
  WuiColorValue,
  WuiLink,
  WuiLinkColor,
  WuiLinkSize,
} from "@wawawoom/wui";

import { Section } from "../../../../ts/enum/section.enum.ts";
import { MeModal } from "../Me/MeModal.tsx";
import { MobModal } from "../Mob/MobModal.tsx";
import { UiModal } from "../Ui/UiModal.tsx";
import { WebModal } from "../Web/WebModal.tsx";
import "./Modal.css";
import type { ModalProps } from "./Modal.props.ts";

export const Modal = (props: ModalProps) => {
  const {
    section,
    isAnimating,
    closeButtonColor = WuiColorValue.BLACK_900,
    onCloseModal,
    onOpenModal,
  } = props;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`modal modal--${section} ${isAnimating ? "modal--expanded" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <WuiLink
        href="/"
        size={WuiLinkSize.L}
        className="modal__close"
        onClick={(event) => {
          event.preventDefault();

          onCloseModal();
        }}
        aria-label="Close modal"
        color={WuiLinkColor.GHOST}
        style={{ color: closeButtonColor }}
      >
        <i className="fa-solid fa-xmark"></i>
      </WuiLink>

      <div className="modal__content">
        {section === Section.ME && <MeModal onOpenModal={onOpenModal} />}
        {section === Section.UI && <UiModal />}
        {section === Section.WEB && <WebModal />}
        {section === Section.MOB && <MobModal />}
      </div>
    </div>
  );
};
