import { useEffect, useRef, useState } from "react";

import {
  WuiColorAlias,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/wui";

import { useLampHoverOverlayEnabled } from "../../hooks/useLampHoverOverlayEnabled";
import type Lamp from "../../interface/lamp.interface";
import LampOverlay from "../LampOverlay/LampOverlay";
import "./LampCard.css";

interface LampCardProps extends Lamp {
  onOpenModal: (lamp: Lamp) => void;
}

const LampCard = (props: LampCardProps) => {
  const { images, name, onOpenModal } = props;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const lampHoverOverlayEnabled = useLampHoverOverlayEnabled();

  useEffect(() => {
    if (!lampHoverOverlayEnabled) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
      queueMicrotask(() => {
        setIsHovered(false);
      });
    }
  }, [lampHoverOverlayEnabled]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (!lampHoverOverlayEnabled) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    timeoutRef.current = setTimeout(() => {
      setIsHovered(true);
      timeoutRef.current = null;
    }, 600);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (!lampHoverOverlayEnabled) return;
    const relatedTarget = e.relatedTarget as HTMLElement | null;
    if (
      relatedTarget &&
      relatedTarget.nodeType === Node.ELEMENT_NODE &&
      relatedTarget.closest(".lamp-overlay")
    ) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    hideTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      hideTimeoutRef.current = null;
    }, 200);
  };

  const handleOverlayMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const handleOverlayMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    onOpenModal(props);
  };

  return (
    <>
      <div
        className="lamp-card"
        data-lamp-id={props.id}
        {...(lampHoverOverlayEnabled
          ? { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }
          : {})}
        onClick={handleClick}
      >
        <img src={images[0]} alt="" className="lamp-media" />

        <WuiTitle
          className="lamp-name"
          color={WuiColorAlias.NEUTRAL_0}
          as={WuiTitleAs.H2}
          look={WuiTitleLook.H5}
        >
          {name}
        </WuiTitle>
      </div>

      {lampHoverOverlayEnabled && isHovered && (
        <LampOverlay
          lamp={props}
          onMouseEnter={handleOverlayMouseEnter}
          onMouseLeave={handleOverlayMouseLeave}
          onOpenModal={onOpenModal}
        />
      )}
    </>
  );
};

export default LampCard;
