import { useEffect } from "react";

import {
  WuiColorValue,
  WuiLink,
  WuiLinkColor,
  WuiLinkSize,
} from "@wawawoom/wui";

import { Section } from "../../../../ts/enum/section.enum.ts";
import { DesignSystemModal } from "../DesignSystem/DesignSystemModal.tsx";
import { FrontEndModal } from "../FrontEnd/FrontEndModal.tsx";
import { PortfolioModal } from "../Portfolio/PortfolioModal.tsx";
import { ProfileModal } from "../Profile/ProfileModal.tsx";
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
        {section === Section.DESIGN_SYSTEM && <DesignSystemModal />}
        {section === Section.FRONT_END && <FrontEndModal />}
        {section === Section.PORTFOLIO && <PortfolioModal />}
        {section === Section.PROFILE && (
          <ProfileModal onOpenModal={onOpenModal} />
        )}
      </div>
    </div>
  );
};
