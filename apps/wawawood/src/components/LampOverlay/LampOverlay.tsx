import { useEffect, useRef, useState } from "react";

import {
  WuiButton,
  WuiButtonSize,
  WuiColorAlias,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/wui";

import { useLampVideoSrc } from "../../hooks/useLampVideoSrc";
import type Lamp from "../../interface/lamp.interface";
import "./LampOverlay.css";

const VIEWPORT_MARGIN_PX = 12;

function overlayVideoSrc(resolved: string): string {
  if (
    resolved.startsWith("http://") ||
    resolved.startsWith("https://") ||
    resolved.startsWith("//")
  ) {
    return resolved;
  }
  return `${import.meta.env.BASE_URL || ""}/lamp/video/${resolved}`;
}

interface LampOverlayProps {
  lamp: Lamp;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onOpenModal: (lamp: Lamp) => void;
  hasUserInteracted: boolean;
  /** When the overlay preview video is playing (Hero background should pause). */
  onOverlayVideoActiveChange?: (active: boolean) => void;
}

const LampOverlay = ({
  lamp,
  onMouseEnter,
  onMouseLeave,
  onOpenModal,
  hasUserInteracted,
  onOverlayVideoActiveChange,
}: LampOverlayProps) => {
  const [position, setPosition] = useState<{
    left: number;
    bottom: number;
    width: number;
    height: number;
  } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isAudioBlocked, setIsAudioBlocked] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const lampVideoSrc = useLampVideoSrc(lamp.video);

  useEffect(() => {
    const cardElement = document.querySelector(
      `[data-lamp-id="${lamp.id}"]`
    ) as HTMLElement;

    if (!cardElement) {
      setPosition(null);
      return;
    }

    const updatePosition = () => {
      const rect = cardElement.getBoundingClientRect();
      const m = VIEWPORT_MARGIN_PX;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      /** Must match `.lamp-overlay[data-visible='true'] { transform: scale(...) }` in LampOverlay.css */
      const scale = 1.3;
      const W = rect.width;

      /**
       * With `transform-origin: bottom center`, the painted box grows horizontally from the
       * bottom-center: visualLeft = layoutLeft + W×(1−scale)/2 (extends left when scale > 1).
       * See: visualLeft = layoutLeft − W×(scale−1)/2.
       */
      const minLayoutLeft = m + (W * (scale - 1)) / 2;
      const maxLayoutLeft = vw - m - (W * (1 + scale)) / 2;

      let left = rect.left;
      if (maxLayoutLeft >= minLayoutLeft) {
        left = Math.max(minLayoutLeft, Math.min(left, maxLayoutLeft));
      } else {
        left = (minLayoutLeft + maxLayoutLeft) / 2;
      }

      let bottom = window.innerHeight - rect.bottom;

      /** Approximate layout height (16:9 media + text); visual extends up by ~(scale−1)×H from bottom origin. */
      const estLayoutH = W * (9 / 16) + 100;
      const minLayoutBottom = m;
      const maxLayoutBottom = vh - m - estLayoutH * scale;
      if (maxLayoutBottom >= minLayoutBottom) {
        bottom = Math.max(minLayoutBottom, Math.min(bottom, maxLayoutBottom));
      }

      setPosition({
        left,
        bottom,
        width: rect.width,
        height: rect.height,
      });
    };

    updatePosition();

    setIsVisible(false);
    setShowVideo(false);
    setIsAudioBlocked(false);

    animationFrameRef.current = requestAnimationFrame(() => {
      animationFrameRef.current = requestAnimationFrame(() => {
        setIsVisible(true);
        animationFrameRef.current = null;
      });
    });

    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (videoTimeoutRef.current) {
        clearTimeout(videoTimeoutRef.current);
      }
    };
  }, [lamp.id]);

  useEffect(() => {
    if (isVisible && lamp.video && !showVideo) {
      videoTimeoutRef.current = setTimeout(() => {
        setShowVideo(true);
        videoTimeoutRef.current = null;
      }, 1000);

      return () => {
        if (videoTimeoutRef.current) {
          clearTimeout(videoTimeoutRef.current);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, lamp.video, lamp.id]);

  useEffect(() => {
    if (!showVideo || !videoRef.current) {
      return;
    }
    const el = videoRef.current;
    el.playsInline = true;

    const playMuted = async () => {
      el.muted = true;
      el.defaultMuted = true;
      await el.play();
    };

    const playWithSound = async () => {
      el.muted = false;
      el.defaultMuted = false;
      el.volume = 1;
      await el.play();
    };

    if (!hasUserInteracted) {
      setIsAudioBlocked(true);
      void playMuted().catch((error) => {
        console.error("Error while playing muted preview video:", error);
      });
      return;
    }

    void playWithSound().catch(() => {
      /** Fallback for strict autoplay policies on specific browsers/devices. */
      setIsAudioBlocked(true);
      void playMuted().catch((error) => {
        console.error("Error while playing muted preview video:", error);
      });
    });
    setIsAudioBlocked(false);
  }, [showVideo, hasUserInteracted]);

  useEffect(() => {
    onOverlayVideoActiveChange?.(showVideo);
    return () => {
      onOverlayVideoActiveChange?.(false);
    };
  }, [showVideo, onOverlayVideoActiveChange]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      if (videoTimeoutRef.current) {
        clearTimeout(videoTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseLeave = () => {
    setIsVisible(false);

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    if (videoTimeoutRef.current) {
      clearTimeout(videoTimeoutRef.current);
    }

    hideTimeoutRef.current = setTimeout(() => {
      onMouseLeave();
      hideTimeoutRef.current = null;
    }, 300);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    onOpenModal(lamp);
  };

  const handleEnableSound = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;

    el.muted = false;
    el.defaultMuted = false;
    el.volume = 1;

    void el.play()
      .then(() => {
        setIsAudioBlocked(false);
      })
      .catch((error) => {
        console.error("Error while enabling preview audio:", error);
      });
  };

  if (!position) {
    return null;
  }

  return (
    <div
      className="lamp-overlay"
      data-visible={isVisible}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        left: `${position.left}px`,
        bottom: `${position.bottom}px`,
        width: `${position.width}px`,
      }}
    >
      <div className="lamp-overlay-media" onClick={handleClick}>
        <img
          src={lamp.images[0]}
          alt={lamp.name}
          className="lamp-overlay-image"
        />
        {lampVideoSrc && (
          <video
            key={lampVideoSrc}
            ref={videoRef}
            src={overlayVideoSrc(lampVideoSrc)}
            className="lamp-overlay-video"
            data-visible={showVideo}
            loop
            playsInline
          />
        )}
        {showVideo && isAudioBlocked && (
          <WuiButton
            className="lamp-overlay-enable-audio"
            size={WuiButtonSize.S}
            onClick={handleEnableSound}
          >
            Enable sound
          </WuiButton>
        )}
      </div>

      <div className="lamp-overlay-content">
        <WuiTitle
          as={WuiTitleAs.H3}
          look={WuiTitleLook.H5}
          color={WuiColorAlias.NEUTRAL_0}
          className="lamp-overlay-name"
        >
          {lamp.name}
        </WuiTitle>

        <WuiText
          as={WuiTextAs.P}
          size={WuiTextSize.XS}
          color={WuiColorAlias.NEUTRAL_200}
          className="lamp-overlay-description"
        >
          {lamp.description}
        </WuiText>

        <div className="lamp-overlay-footer">
          <WuiButton onClick={handleClick} size={WuiButtonSize.S}>
            &gt; Détails
          </WuiButton>
        </div>
      </div>
    </div>
  );
};

export default LampOverlay;
