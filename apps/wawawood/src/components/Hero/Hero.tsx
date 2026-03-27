import { useEffect, useRef } from "react";

import { WuiButton, WuiButtonColor, WuiButtonSize } from "@wawawoom/wui";

import { useLampVideoSrc } from "../../hooks/useLampVideoSrc";
import type Lamp from "../../interface/lamp.interface";
import "./Hero.css";

function tryPlayMutedVideo(el: HTMLVideoElement | null) {
  if (!el) return;
  el.muted = true;

  void el.play().catch(() => {
    /* autoplay policy, low power mode, or transient errors */
  });
}

const Hero = (props: {
  lamp: Lamp;
  onOpenModal: (lamp: Lamp) => void;
  isModalOpen: boolean;
  isLampOverlayVideoPlaying: boolean;
}) => {
  const { lamp, onOpenModal, isModalOpen, isLampOverlayVideoPlaying } = props;
  const { name, description, logo, video, images } = lamp;
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = useLampVideoSrc(video);

  const shouldPauseHero = isModalOpen || isLampOverlayVideoPlaying;

  const handleOpenDetails = () => {
    onOpenModal(lamp);
  };

  useEffect(() => {
    if (shouldPauseHero) {
      videoRef.current?.pause();
      return;
    }
    if (video) {
      tryPlayMutedVideo(videoRef.current);
    }
  }, [shouldPauseHero, video]);

  /** iOS Safari often ignores `autoplay` without `playsInline` + explicit muted `play()` after load. */
  useEffect(() => {
    if (!videoSrc) return;
    const el = videoRef.current;
    if (!el) return;

    const tryPlay = () => tryPlayMutedVideo(el);

    if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      tryPlay();
    } else {
      el.addEventListener("canplay", tryPlay, { once: true });
    }

    return () => {
      el.removeEventListener("canplay", tryPlay);
    };
  }, [videoSrc]);

  return (
    <>
      {videoSrc ? (
        <video
          key={videoSrc}
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          className="hero-video"
        />
      ) : (
        <img src={`${images[0]}`} alt={name} className="hero-image" />
      )}

      <div className="hero-content">
        {logo ? (
          <img src={logo} alt={name} className="hero-logo" />
        ) : (
          <h1 className="hero-name">{name}</h1>
        )}

        {description && <p className="hero-description">{description}</p>}

        <WuiButton
          className="hero-cta"
          color={WuiButtonColor.SECONDARY}
          size={WuiButtonSize.M}
          onClick={handleOpenDetails}
        >
          🔎&nbsp;&nbsp;Détails
        </WuiButton>
      </div>
    </>
  );
};

export default Hero;
