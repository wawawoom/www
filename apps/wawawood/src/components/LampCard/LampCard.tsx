import { useEffect, useRef, useState } from "react";

import type Lamp from "../../interface/lamp.interface";
import LampOverlay from "../LampOverlay/LampOverlay";
import "./LampCard.css";

interface LampCardProps extends Lamp {
  onOpenModal: (lamp: Lamp) => void;
}

const LampCard = (props: LampCardProps) => {
  const { images, onOpenModal } = props;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isHovered, setIsHovered] = useState(false);

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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <img src={images[0]} alt="" className="lamp-media" />
      </div>

      {isHovered && (
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
